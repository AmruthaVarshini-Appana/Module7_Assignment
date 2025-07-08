import mongoose, { Schema } from 'mongoose';
// Define the schema
const courseSchema = new Schema({
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
}, {
    timestamps: true, // adds createdAt and updatedAt fields
});
// Export the model
const Course = mongoose.model('Course', courseSchema);
export default Course;
