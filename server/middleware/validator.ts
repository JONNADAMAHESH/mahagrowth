import { Request, Response, NextFunction } from 'express';

// Simple, robust validator without heavy dependencies
export function validateContactSubmission(req: Request, res: Response, next: NextFunction) {
  const { name, email, company, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_FAILED',
        message: 'Name is required and must be at least 2 characters.',
        field: 'name',
      },
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_FAILED',
        message: 'A valid business or personal email address is required.',
        field: 'email',
      },
    });
  }

  // Sanitize strings
  req.body.name = name.trim().substring(0, 100);
  req.body.email = email.trim().toLowerCase().substring(0, 120);
  if (company && typeof company === 'string') {
    req.body.company = company.trim().substring(0, 120);
  }
  if (message && typeof message === 'string') {
    req.body.message = message.trim().substring(0, 2000);
  }

  next();
}

export function validateAssistantRequest(req: Request, res: Response, next: NextFunction) {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_FAILED',
        message: 'Message is required and cannot be empty.',
        field: 'message',
      },
    });
  }

  if (message.length > 3000) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_FAILED',
        message: 'Message exceeds maximum allowed length of 3000 characters.',
        field: 'message',
      },
    });
  }

  req.body.message = message.trim();
  next();
}

export function validateDiagnosticSubmission(req: Request, res: Response, next: NextFunction) {
  const { company, stage, bottlenecks } = req.body;

  if (!company || typeof company !== 'string' || company.trim().length === 0) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_FAILED',
        message: 'Company name is required.',
        field: 'company',
      },
    });
  }

  const allowedStages = ['START', 'GROW', 'AUTOMATE', 'SCALE'];
  if (!stage || !allowedStages.includes(stage)) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_FAILED',
        message: `Stage must be one of: ${allowedStages.join(', ')}`,
        field: 'stage',
      },
    });
  }

  req.body.company = company.trim();
  req.body.bottlenecks = Array.isArray(bottlenecks) ? bottlenecks : [];
  next();
}
