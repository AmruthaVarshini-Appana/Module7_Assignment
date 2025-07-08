import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interface for a Course document
export interface ICourse extends Document {
  title: string;
  description: string;
  instructorId: mongoose.Types.ObjectId;
}

// Define the schema
const courseSchema: Schema<ICourse> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
    },
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

// Export the model
const Course: Model<ICourse> = mongoose.model<ICourse>('Course', courseSchema);
export default Course;