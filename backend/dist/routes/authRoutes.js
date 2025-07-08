import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; // ✅ Use `.js` extension
const router = express.Router();
// ✅ POST /api/auth/register
// ✅ Description: Register a new user
// ✅ Access: Public
router.post('/register', registerUser);
// ✅ POST /api/auth/login
// ✅ Description: Authenticate user and return JWT
// ✅ Access: Public
router.post('/login', loginUser);
export default router;
