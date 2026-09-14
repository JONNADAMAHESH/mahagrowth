import { db } from '../server/db/database';

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
    const { name, email, company, role, useCase, stage, primaryChallenge, timeline, message } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ error: { code: 'MISSING_FIELDS', message: 'Name and email are required.' } });
    }

    const lead = await db.createLead({
      name,
      email,
      company: company || 'Not specified',
      stage: stage || 'GROW',
      primaryChallenge: primaryChallenge || useCase || 'Predictable Customer Acquisition & Leads',
      priority: 'high',
      notes: `Role: ${role || 'Executive/Founder'}. Stage: ${stage || 'GROW'}. Timeline: ${timeline || 'Within 14 Days'}. Message: ${message || 'No additional message.'}`,
      message: message || `Inbound strategic inquiry from ${company || name}`,
    });

    await db.triggerWorkflow('wf-01');

    return res.status(200).json({
      success: true,
      inquiryId: lead.id,
      message: 'Thank you. Your growth inquiry has been securely registered in our system and an architect will review your dossier within 24 hours.',
      receivedAt: lead.createdAt,
    });
  } catch (err: any) {
    console.error('[Vercel API /api/contact Error]:', err);
    return res.status(500).json({
      error: {
        code: 'CONTACT_SUBMISSION_ERROR',
        message: 'Failed to submit inquiry.',
      },
    });
  }
}
