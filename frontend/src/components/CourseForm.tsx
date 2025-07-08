import { useState } from 'react';
import API from '../api';

interface Props {
  onCreated: () => void;
}

export default function CourseForm({ onCreated }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      await API.post('/courses', { title, description });
      setTitle('');
      setDescription('');
      onCreated();
    } catch (error) {
      console.error('Course creation failed:', error);
      alert('Failed to create course. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-md space-y-4 max-w-xl w-full mx-auto"
    >
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-12 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-28 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="px-5 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Create
        </button>
      </div>
    </form>
  );
}