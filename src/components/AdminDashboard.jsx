import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events');
      setEvents(data.events || data);
    } catch (err) {
      toast.error('Failed to fetch events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6">Welcome, Admin</h1>

      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        <Link to="/admin/create-event">
          <div className="bg-emerald-100 hover:bg-emerald-200 p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Create New Event</h2>
          </div>
        </Link>

        <Link to="/events">
          <div className="bg-emerald-100 hover:bg-emerald-200 p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold">Browse All Events</h2>
          </div>
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Manage Events</h2>
      {events.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event.id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
              <p className="text-sm mb-2">{event.description.slice(0, 100)}...</p>
              <div className="flex gap-4 mt-2">
                <Link
                  to={`/admin/edit-event/${event.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <Link
  to={`/admin/event-bookings/${event.id}`}
  className="text-green-600 hover:underline"
>
  View Bookings
</Link>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
