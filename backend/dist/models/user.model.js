import mongoose from 'mongoose';
// ✅ Create the Mongoose schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student',
    },
}, { timestamps: true });
// ✅ Prevent model overwrite issues in development (important for hot-reload)
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
