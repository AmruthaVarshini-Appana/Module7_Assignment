import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CreateCourse = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔒 If not logged in, show login prompt
  if (!token) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg font-semibold mb-4">🔒 Please login to continue</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // 💻 Main form logic
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/courses",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("✅ Course created!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create course. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;