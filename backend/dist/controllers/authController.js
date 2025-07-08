import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // ✅ Ensure model is imported with .js extension if using ES modules
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('❌ JWT_SECRET not defined in environment');
}
// ✅ Register Controller
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        const token = jwt.sign({
            _id: newUser._id,
            email: newUser.email,
            role: newUser.role,
        }, JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token });
    }
    catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ message: 'Registration failed' });
    }
};
// ✅ Login Controller
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role,
        }, JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });
    }
    catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Login failed' });
    }
};
