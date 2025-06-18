// components/Dashboard.jsx
import React from 'react';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  if (!token) return <div className="text-red-600">Unauthorized</div>;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    const role = payload.role;

    if (role === 'ADMIN') return <AdminDashboard />;
    if (role === 'USER') return <UserDashboard />;
    return <div className="text-red-600">Unknown Role</div>;
  } catch (err) {
    return <div className="text-red-600">Invalid Token</div>;
  }
};

export default Dashboard;
