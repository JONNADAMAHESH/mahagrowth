const fs = require('fs');

let dbContent = fs.readFileSync('server/db/database.ts', 'utf-8');
dbContent = dbContent.replace(/const supabase = createClient/, 'export const supabase = createClient');
fs.writeFileSync('server/db/database.ts', dbContent);

let authContent = fs.readFileSync('server/middleware/auth.ts', 'utf-8');
const newAuth = `
import { Request, Response, NextFunction } from 'express';
import { supabase, UserEntity } from '../db/database';

export interface AuthenticatedRequest extends Request {
  user?: UserEntity;
}

export async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const customHeader = req.headers['x-auth-token'] as string | undefined;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (customHeader) {
    token = customHeader;
  }

  // If token is provided, verify against Supabase GoTrue Auth
  if (token) {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (user && !error) {
      req.user = {
        id: user.id,
        name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
        email: user.email || "",
        role: user.user_metadata?.role || "client",
        company: user.user_metadata?.company || "My Company",
        permissions: [],
        token: token
      };
      return next();
    }
  }

  // If no valid token provided, user is unauthenticated
  req.user = undefined;
  next();
}

export function requireRole(allowedRoles: Array<'admin' | 'team' | 'client'>) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to access this resource.',
          timestamp: new Date().toISOString(),
        },
      });
    }

    if (req.user.role === 'admin') {
      // Admin has root access across all features
      return next();
    }

    if (!allowedRoles.includes(req.user.role as any)) {
      return res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: \`Access denied. Requires one of roles: [\${allowedRoles.join(', ')}]. Current role: '\${req.user.role}'.\`,
          timestamp: new Date().toISOString(),
        },
      });
    }

    next();
  };
}
`;
fs.writeFileSync('server/middleware/auth.ts', newAuth);
