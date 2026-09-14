import { Request, Response, NextFunction } from 'express';
import { db } from '../db/database';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const requestId = 'req_' + Math.random().toString(36).substring(2, 9);
  res.setHeader('X-Request-Id', requestId);

  db.incrementRequestCount();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logSummary = `${req.method} ${req.originalUrl || req.url} ${res.statusCode} (${duration}ms) [${requestId}]`;

    // Only log in dev/server console
    if (res.statusCode >= 400) {
      console.warn(`[HTTP WARN] ${logSummary}`);
    } else {
      console.log(`[HTTP INFO] ${logSummary}`);
    }
  });

  next();
}
