import { db } from '../server/db/database';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const submissions = await db.getDiagnostics();
      return res.status(200).json({ submissions });
    }

    if (req.method === 'POST') {
      const { answers, computedRoi, stage, bottlenecks, hoursRecoverable, targetArr } = req.body || {};
      const saved = await db.saveDiagnostic({
        clientName: answers?.name || 'Anonymous User',
        company: answers?.company || 'Confidential Enterprise',
        stage: stage || 'GROW ($15k - $60k/mo)',
        bottlenecks: bottlenecks || ['Data Silos', 'Manual Ingestion Bottlenecks'],
        computedRoi: computedRoi || '+$142,000 / yr',
        hoursRecoverable: hoursRecoverable || '24 hrs/wk',
        targetArr: targetArr || '$2.4M ARR',
        priorityStack: ['Automated Power BI Pipeline', 'Anomaly Detection Core', 'Multi-Format Ingestion'],
        status: 'completed',
        createdAt: new Date().toISOString(),
      });
      return res.status(201).json({ success: true, submission: saved });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('[Vercel API /api/diagnostics Error]:', err);
    return res.status(500).json({ error: 'Diagnostic service error' });
  }
}
