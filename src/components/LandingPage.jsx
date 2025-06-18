// src/components/LandingPage.jsx
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold text-emerald-700 mb-4">Welcome to Evento 🎉</h1>
        <p className="text-gray-600 mb-6">
          Your one-stop platform to explore and book amazing events. Simple, fast, and powerful.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded hover:bg-emerald-100"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
