import { runBrain } from '../../lib/runtimeBrain';
import { constitution } from '../../lib/constitution';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, session_id } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  const sessionId =
    session_id && session_id !== 'default' && session_id !== 'null'
      ? String(session_id).trim()
      : 'aegion_' + Date.now();

  const result = await runBrain({
    userInput:    message.trim(),
    sessionId,
    constitution,
  });

  if (!result.success) {
    return res.status(500).json({ error: result.error || 'Runtime error' });
  }

  return res.status(200).json({
    reply:      result.response,
    session_id: sessionId,
  });
}
