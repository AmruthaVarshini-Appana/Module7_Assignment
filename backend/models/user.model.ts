import mongoose, { Document, Schema } from 'mongoose';

// ✅ Define the TypeScript interface for a User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'instructor' | 'admin';
}

// ✅ Create the Mongoose schema
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite issues in development (important for hot-reload)
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;