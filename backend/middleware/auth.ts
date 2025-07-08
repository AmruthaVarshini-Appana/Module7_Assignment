import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// ✅ Use destructuring to extract methods from CommonJS default import
const { verify } = jwt;
type JwtPayload = jwt.JwtPayload;

// ✅ Extend Express Request to include decoded user
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

// ✅ JWT verification middleware
export const verifyJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: Token missing' });
    return;
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};

// ✅ Role-based access middleware
export const checkRole = (requiredRole: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const user = req.user as JwtPayload;

    if (!user || typeof user !== 'object' || user.role !== requiredRole) {
      res.status(403).json({ message: 'Forbidden: Insufficient role' });
      return;
    }

    next();
  };
};
