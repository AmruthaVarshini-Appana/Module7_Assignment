import type { Request, Response } from 'express';
import Course from '../models/course.model.js';
import _User from '../models/user.model.js'; // Register User model for populate // Required for populate
import type { AuthenticatedRequest } from '../middleware/auth.js';

// ✅ Create a new course (for instructor only)
export const createCourse = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ message: 'Title and description are required' });
      return;
    }

    const instructorId = (req.user as any)?._id;

    if (!instructorId) {
      res.status(401).json({ message: 'Unauthorized: Missing instructor ID' });
      return;
    }

    const course = new Course({ title, description, instructorId });
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Failed to create course' });
  }
};

// ✅ Get all courses with populated instructor info
export const getCourses = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const courses = await Course.find().populate('instructorId', 'name email');
    res.status(200).json(courses);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};
