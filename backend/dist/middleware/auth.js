import jwt from 'jsonwebtoken';
// ✅ Use destructuring to extract methods from CommonJS default import
const { verify } = jwt;
// ✅ JWT verification middleware
export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized: Token missing' });
        return;
    }
    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }
};
// ✅ Role-based access middleware
export const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || typeof user !== 'object' || user.role !== requiredRole) {
            res.status(403).json({ message: 'Forbidden: Insufficient role' });
            return;
        }
        next();
    };
};
