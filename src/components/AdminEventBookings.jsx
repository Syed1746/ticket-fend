import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function AdminEventBookings() {
  const { id } = useParams();
  const [eventInfo, setEventInfo] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get(`/events/${id}/bookings`);
        setEventInfo(data.event);
        setBookings(data.bookings);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading bookings…</div>;
  if (!eventInfo) return <div className="text-center p-6">Event not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/dashboard" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-2">{eventInfo.title}</h1>
      <p className="text-gray-600 mb-6">Total Slots: {eventInfo.totalSlots}</p>

      {bookings.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Booked At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr key={b.id} className={idx % 2 === 0 ? '' : 'bg-gray-50'}>
                <td className="border px-4 py-2 text-center">{idx + 1}</td>
                <td className="border px-4 py-2">{b.user.name}</td>
                <td className="border px-4 py-2">{b.user.email}</td>
                <td className="border px-4 py-2">
                  {new Date(b.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings for this event yet.</p>
      )}
    </div>
  );
}
