import { aiAgentService, AiAgentType } from '../server/services/aiAgentService';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, context, agentType } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: { code: 'MISSING_MESSAGE', message: 'Message is required.' } });
    }

    const targetAgent: AiAgentType = agentType || 'growth_advisor';
    const result = await aiAgentService.execute({
      agentType: targetAgent,
      message,
      context,
    });

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('[Vercel API /api/assistant Error]:', err);
    return res.status(500).json({
      error: {
        code: 'AI_EXECUTION_ERROR',
        message: 'Failed to process AI agent request.',
      },
    });
  }
}
