import { useEffect, useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const { data } = await api.get('/events/bookings');
        // backend returns { bookings: [ ... ] }
        setBookings(data.bookings || []);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load your bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome, User</h1>

      <div className="mb-8">
        <Link to="/events">
          <div className="bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Browse Events</h2>
          </div>
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

      {loading ? (
        <p>Loading your bookings…</p>
      ) : bookings.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {bookings.map((b) => (
            <div key={b.id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-xl font-semibold mb-1">{b.event.title}</h3>
              <p className="text-sm mb-1"><strong>Location:</strong> {b.event.location}</p>
              <p className="text-sm mb-1">
                <strong>Date:</strong> {new Date(b.event.date).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Booked On: {new Date(b.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no bookings yet.</p>
      )}
    </div>
  );
}
