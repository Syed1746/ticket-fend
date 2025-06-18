import { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
  });

  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await api.post('/auth/signup', form);
      localStorage.setItem('token', data.token);
      toast.success('Signup successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-emerald-50">
        <div className="flex items-center justify-center p-8 order-1 md:order-2">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-emerald-600 mb-2 text-center">Evento</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">Create your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>

            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:block order-2 md:order-1">
        <img
          src="/login.jpg"
          alt="Signup Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
