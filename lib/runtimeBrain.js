import { supabase } from './supabase';

const MEM = {
  IDENTITY: 'identity_memory',
  PROJECT:  'project_memory',
  SHORT:    'short_term_memory',
  LONG:     'long_term_memory',
};

const BUDGET = {
  MAX_CONTEXT:  2800,
  MAX_IDENTITY: 5,
  MAX_PROJECT:  4,
  MAX_LONG:     5,
  MAX_SHORT:    6,
  PRUNE_KEEP:   20,
};

async function retrieve(sessionId, userInput) {
  const [identity, project, shortTerm, rawLong] = await Promise.all([
    supabase.from('memories').select('id,type,content,priority,role')
      .eq('type', MEM.IDENTITY).order('priority', { ascending: false })
      .limit(BUDGET.MAX_IDENTITY).then((r) => r.data || []),
    supabase.from('memories').select('id,type,content,priority,role')
      .eq('type', MEM.PROJECT).order('priority', { ascending: false })
      .limit(BUDGET.MAX_PROJECT).then((r) => r.data || []),
    supabase.from('memories').select('id,type,content,priority,role,created_at')
      .eq('type', MEM.SHORT).eq('session_id', sessionId)
      .order('created_at', { ascending: false }).limit(BUDGET.MAX_SHORT)
      .then((r) => (r.data || []).reverse()),
    supabase.from('memories').select('id,type,content,priority,role')
      .eq('type', MEM.LONG).order('priority', { ascending: false })
      .limit(30).then((r) => r.data || []),
  ]);

  const kw = userInput.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const longTerm = rawLong
    .map((m) => ({
      ...m,
      _score: kw.filter((k) => (m.content || '').toLowerCase().includes(k)).length * 2
        + (m.priority || 0),
    }))
    .sort((a, b) => b._score - a._score)
    .slice(0, BUDGET.MAX_LONG);

  return { identity, project, shortTerm, longTerm };
}

function filter(memories) {
  const seen = new Set();
  const blocks = [];
  let used = 0;

  for (const mem of [
    ...memories.identity,
    ...memories.project,
    ...memories.longTerm,
    ...memories.shortTerm,
  ]) {
    const text = (mem.content || '').trim();
    if (!text) continue;
    const fp = text.slice(0, 80);
    if (seen.has(fp)) continue;
    seen.add(fp);
    const cost = Math.ceil(text.length / 4);
    if (mem.type !== MEM.IDENTITY && used + cost > BUDGET.MAX_CONTEXT) continue;
    blocks.push(mem);
    used += cost;
  }

  return { blocks, usedTokens: used };
}

function buildPrompt(blocks, userInput, constitutionText) {
  const sections = [];
  if (constitutionText) sections.push(`[GOVERNANCE]\n${constitutionText}`);
  const byType = (t) =>
    blocks.filter((m) => m.type === t).map((m) => m.content.trim()).join('\n');
  const i = byType(MEM.IDENTITY); if (i) sections.push(`[IDENTITY]\n${i}`);
  const p = byType(MEM.PROJECT);  if (p) sections.push(`[PROJECT]\n${p}`);
  const l = byType(MEM.LONG);     if (l) sections.push(`[LONG-TERM]\n${l}`);
  const system  = sections.join('\n\n---\n\n');
  const history = blocks
    .filter((m) => m.type === MEM.SHORT)
    .map((m) => ({ role: m.role || 'user', content: m.content }));
  return { system, messages: [...history, { role: 'user', content: userInput }] };
}

async function callGroq(system, messages) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model:       'llama3-8b-8192',
      messages:    [{ role: 'system', content: system }, ...messages],
      max_tokens:  1024,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`Groq: ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

async function saveAndPrune(sessionId, userInput, aiResponse) {
  const now     = new Date().toISOString();
  const inserts = [
    { type: MEM.SHORT, session_id: sessionId, role: 'user',      content: userInput,  priority: 5, created_at: now },
    { type: MEM.SHORT, session_id: sessionId, role: 'assistant', content: aiResponse, priority: 5, created_at: now },
  ];
  if (aiResponse.length > 300) {
    inserts.push({
      type: MEM.LONG, session_id: sessionId, role: 'assistant',
      content:  `[Auto-Insight] ${aiResponse.slice(0, 400).trim()}…`,
      priority: 3, created_at: now,
    });
  }
  await supabase.from('memories').insert(inserts);
  const { data } = await supabase.from('memories').select('id')
    .eq('type', MEM.SHORT).eq('session_id', sessionId)
    .order('created_at', { ascending: false }).limit(100);
  if (data && data.length > BUDGET.PRUNE_KEEP) {
    const ids = data.slice(BUDGET.PRUNE_KEEP).map((m) => m.id);
    await supabase.from('memories').delete().in('id', ids);
  }
}

export async function runBrain({ userInput, sessionId, constitution: constitutionText = null }) {
  try {
    const memories               = await retrieve(sessionId, userInput);
    const { blocks, usedTokens } = filter(memories);
    const { system, messages }   = buildPrompt(blocks, userInput, constitutionText);
    const aiResponse             = await callGroq(system, messages);
    await saveAndPrune(sessionId, userInput, aiResponse);
    return { success: true, response: aiResponse, tokensUsed: usedTokens };
  } catch (error) {
    console.error('[runBrain]', error.message);
    return { success: false, error: error.message, response: null };
  }
}
