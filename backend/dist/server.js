import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// ✅ Load environment variables from .env file
dotenv.config();
// ✅ Debug log to confirm env is loaded
if (!process.env.JWT_SECRET) {
    throw new Error('❌ JWT_SECRET not defined in environment');
}
if (!process.env.MONGO_URI) {
    throw new Error('❌ MONGO_URI is not defined in environment');
}
// ✅ Initialize Express app
const app = express();
// ✅ Middleware
app.use(cors());
app.use(express.json());
// ✅ Import models BEFORE routes (Mongoose needs them registered)
import './models/user.model.js';
import './models/course.model.js';
// ✅ Import routes
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from './routes/authRoutes.js';
// ✅ API Routes
app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes);
// ✅ Health check endpoint
app.get('/', (_req, res) => {
    res.send('📚 Course Management System Backend is running');
});
// ✅ Start server after DB connection
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('❌ MongoDB connection failed:', error);
});
