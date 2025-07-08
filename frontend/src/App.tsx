import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import API from "./api";
import { Course } from "./types";

export default function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenAvailable, setTokenAvailable] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setTokenAvailable(false);
      return;
    }

    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get<Course[]>("/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch courses:", err);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  if (!tokenAvailable) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-lg text-red-600 font-semibold mb-4">
            🔒 Please login to continue
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Course Management System
      </h1>

      <div className="w-full max-w-2xl space-y-12">
        {/* ✅ Course Creation Form */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Course</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CourseForm onCreated={fetchCourses} />
          </div>
        </section>

        {/* ✅ Course List Display */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Course List</h2>
          <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
            {loading ? (
              <p className="p-4 text-gray-500 text-sm">Loading courses...</p>
            ) : error ? (
              <p className="p-4 text-red-500 text-sm">{error}</p>
            ) : courses.length === 0 ? (
              <p className="p-4 text-gray-600 text-sm">No courses available</p>
            ) : (
              <CourseList courses={courses} onUpdated={fetchCourses} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}