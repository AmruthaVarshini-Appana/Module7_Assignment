import { useState } from 'react';
import { Course } from '../types';
import API from '../api';

interface Props {
  courses: Course[];
  onUpdated: () => Promise<void>;
}

export default function CourseList({ courses, onUpdated }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  const startEdit = (course: Course) => {
    setEditingId(course._id);
    setEditForm({ title: course.title, description: course.description });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', description: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      await API.put(`/courses/${editingId}`, editForm);
      setEditingId(null);
      await onUpdated();
    } catch (err) {
      console.error('❌ Failed to update course:', err);
      alert('Update failed. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    if (!confirmed) return;

    try {
      await API.delete(`/courses/${id}`);
      await onUpdated();
    } catch (err) {
      console.error('❌ Failed to delete course:', err);
      alert('Delete failed. Please try again.');
    }
  };

  if (!courses || courses.length === 0) {
    return (
      <p className="text-gray-500 px-2 py-3 bg-gray-50 rounded text-sm">
        No courses available.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => {
        const instructor =
          typeof course.instructorId === 'object' && course.instructorId !== null
            ? course.instructorId
            : null;

        const isEditing = editingId === course._id;

        return (
          <div
            key={course._id}
            className="flex justify-between items-start bg-white p-4 border rounded-lg shadow-sm"
          >
            <div className="flex-1">
              {isEditing ? (
                <>
                  <input
                    name="title"
                    value={editForm.title}
                    onChange={handleChange}
                    className="w-full mb-2 px-2 py-1 border rounded"
                  />
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleChange}
                    className="w-full mb-2 px-2 py-1 border rounded"
                  />
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Instructor: {instructor?.name || 'N/A'}
                  </p>
                </>
              )}
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 text-sm bg-gray-300 hover:bg-gray-400 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(course)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded border border-gray-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}