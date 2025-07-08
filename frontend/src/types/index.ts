// Instructor interface defines the structure for instructor details
export interface Instructor {
  _id: string;
  name: string;
  email: string;
}

// Course interface defines the structure for course details
export interface Course {
  _id: string;
  title: string;
  description: string;
  instructorId: Instructor | string; // Can be full object or just ID
  createdAt: string;
  updatedAt: string;
}

