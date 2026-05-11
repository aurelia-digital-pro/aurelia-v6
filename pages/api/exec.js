import { getExecutionMemory, getRecentDecisions, getRecentTasks } from '../../lib/memory';
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { session_id, type } = req.query;
    if (!session_id) return res.status(400).json({ error: 'session_id is required' });

    try {
      if (type) {
        const { data, error } = await supabase
          .from('execution_memory')
          .select('type, key, value, created_at')
          .eq('session_id', session_id)
          .eq('type', type.toUpperCase())
          .order('created_at', { ascending: false })
          .limit(20);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ session_id, type, results: data || [] });
      }

      const [all, decisions, tasks] = await Promise.all([
        getExecutionMemory(session_id),
        getRecentDecisions(session_id),
        getRecentTasks(session_id),
      ]);

      return res.status(200).json({ session_id, total: all.length, decisions, tasks, all });
    } catch (err) {
      return res.status(500).json({ error: err?.message || 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    const { session_id, type, key, value } = req.body;
    if (!session_id || !type || !value) {
      return res.status(400).json({ error: 'session_id, type, value required' });
    }
    const { error } = await supabase.from('execution_memory').insert({
      session_id, type: type.toUpperCase(), key: key || type.toLowerCase(), value,
    });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
