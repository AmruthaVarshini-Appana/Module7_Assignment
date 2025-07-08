import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // ✅ Axios instance
import { useAuth } from "../context/AuthContext"; // ✅ Auth context

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });

      const { token, role } = res.data;

      if (token && role) {
        login(token, role); // ✅ Save to localStorage + context
        alert("✅ Login successful!");
        navigate("/"); // ✅ Redirect to home
      } else {
        setError("❌ Unexpected response from server.");
      }
    } catch (err: any) {
      console.error("❌ Login failed:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("❌ Invalid credentials. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email:
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Password:
          </label>
          <input
            id="password"
            type="password"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}