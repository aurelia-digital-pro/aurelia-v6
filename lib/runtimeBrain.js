import { supabase } from './supabase';

const BUDGET = {
  MAX_CONTEXT:      2800,
  MAX_SHORT_TERM:   6,
  MAX_LONG_TERM:    5,
  MAX_PROJECT:      4,
  MAX_IDENTITY:     5,
  SESSION_PRUNE:    20,
};

const MEM = {
  IDENTITY:  'identity_memory',
  PROJECT:   'project_memory',
  SHORT:     'short_term_memory',
  LONG:      'long_term_memory',
};

async function retrieveMemory(sessionId, userInput) {
  const [identity, project, shortTerm, longTerm] = await Promise.all([
    supabase.from('memories').select('id,type,content,priority,role')
      .eq('type', MEM.IDENTITY).order('priority', { ascending: false })
      .limit(BUDGET.MAX_IDENTITY).then((r) => r.data || []),
    supabase.from('memories').select('id,type,content,priority,role')
      .eq('type', MEM.PROJECT).order('priority', { ascending: false })
      .limit(BUDGET.MAX_PROJECT).then((r) => r.data || []),
    supabase.from('memories').select('id,type,content,priority,role,created_at')
      .eq('type', MEM.SHORT).eq('session_id', sessionId)
      .order('created_at', { ascending: false }).limit(BUDGET.MAX_SHORT_TERM)
      .then((r) => (r.data || []).reverse()),
    supabase.from('memories').select('id,type,content,priority,role')
      .eq('type', MEM.LONG).order('priority', { ascending: false })
      .limit(30).then((r) => r.data || []),
  ]);
  const keywords = userInput.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const rankedLong = longTerm
    .map((m) => ({
      ...m,
      _score: keywords.filter((k) => (m.content || '').toLowerCase().includes(k)).length * 2
        + (m.priority || 0),
    }))
    .sort((a, b) => b._score - a._score)
    .slice(0, BUDGET.MAX_LONG_TERM);
  return { identity, project, shortTerm, longTerm: rankedLong };
}

function filterContext(memories) {
  const seen = new Set();
  const blocks = [];
  let usedTokens = 0;
  const ordered = [
    ...memories.identity,
    ...memories.project,
    ...memories.longTerm,
    ...memories.shortTerm,
  ];
  for (const mem of ordered) {
    const text = (mem.content || '').trim();
    if (!text) continue;
    const fp = text.slice(0, 80);
    if (seen.has(fp)) continue;
    seen.add(fp);
    const cost = Math.ceil(text.length / 4);
    if (mem.type !== MEM.IDENTITY && usedTokens + cost > BUDGET.MAX_CONTEXT) continue;
    blocks.push(mem);
    usedTokens += cost;
  }
  return { blocks, usedTokens };
}

function buildPrompt(blocks, userInput, constitutionText) {
  const sections = [];
  if (constitutionText) sections.push(`[GOVERNANCE]\n${constitutionText}`);
  const byType = (t) => blocks.filter((m) => m.type === t).map((m) => m.content.trim()).join('\n');
  const i = byType(MEM.IDENTITY); if (i) sections.push(`[IDENTITY]\n${i}`);
  const p = byType(MEM.PROJECT);  if (p) sections.push(`[PROJECT]\n${p}`);
  const l = byType(MEM.LONG);     if (l) sections.push(`[LONG-TERM]\n${l}`);
  const system = sections.join('\n\n---\n\n');
  const history = blocks.filter((m) => m.type === MEM.SHORT)
    .map((m) => ({ role: m.role || 'user', content: m.content }));
  return { system, messages: [...history, { role: 'user', content: userInput }] };
}

async function callGroq(system, messages) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [{ role: 'system', content: system }, ...messages],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`Groq API: ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

async function saveMemory(sessionId, userInput, aiResponse) {
  const now = new Date().toISOString();
  const inserts = [
    { type: MEM.SHORT, session_id: sessionId, role: 'user',      content: userInput,  priority: 5, created_at: now },
    { type: MEM.SHORT, session_id: sessionId, role: 'assistant', content: aiResponse, priority: 5, created_at: now },
  ];
  if (aiResponse.length > 300) {
    inserts.push({
      type: MEM.LONG, session_id: sessionId, role: 'assistant',
      content: `[Auto-Insight] ${aiResponse.slice(0, 400).trim()}…`,
      priority: 3, created_at: now,
    });
  }
  await supabase.from('memories').insert(inserts);
}

async function pruneShortTerm(sessionId) {
  const { data } = await supabase.from('memories').select('id')
    .eq('type', MEM.SHORT).eq('session_id', sessionId)
    .order('created_at', { ascending: false }).limit(100);
  if (!data || data.length <= BUDGET.SESSION_PRUNE) return;
  const toDelete = data.slice(BUDGET.SESSION_PRUNE).map((m) => m.id);
  await supabase.from('memories').delete().in('id', toDelete);
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────
export async function runBrain({ userInput, sessionId, constitution: constitutionText = null }) {
  try {
    const memories              = await retrieveMemory(sessionId, userInput);
    const { blocks, usedTokens } = filterContext(memories);
    const { system, messages }  = buildPrompt(blocks, userInput, constitutionText);
    const aiResponse            = await callGroq(system, messages);
    await Promise.all([saveMemory(sessionId, userInput, aiResponse), pruneShortTerm(sessionId)]);
    return { success: true, response: aiResponse, tokensUsed: usedTokens };
  } catch (error) {
    console.error('[runBrain]', error.message);
    return { success: false, error: error.message, response: null };
  }
}
