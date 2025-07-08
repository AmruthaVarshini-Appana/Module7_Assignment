import express from 'express';
import { createCourse, getCourses } from '../controllers/courseController.js';
import { verifyJWT, checkRole } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/courses
 * @desc    Create a new course (only for instructors)
 * @access  Private
 */
router.post('/', verifyJWT, checkRole('instructor'), createCourse);

/**
 * @route   GET /api/courses
 * @desc    Fetch all courses
 * @access  Public
 */
router.get('/', getCourses);

export default router;