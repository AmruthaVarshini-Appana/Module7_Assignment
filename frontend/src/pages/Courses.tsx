import { useState, useEffect } from 'react';
import CourseForm from '../components/CourseForm';
import CourseList from '../components/CourseList';
import API from '../api';
import { Course } from '../types';

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [reload, setReload] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await API.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [reload]);

  const handleReload = () => setReload(!reload);

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Course Management System
      </h1>

      <div className="w-full max-w-2xl space-y-12">
        {/* Create Course Section */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Create Course</h2>
          <CourseForm onCreated={handleReload} />
        </section>

        {/* Course List Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Course List</h2>
          <CourseList courses={courses} onUpdated={handleReload} />
        </section>
      </div>
    </div>
  );
}