import { useEffect, useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // If you encode role in JWT, decode here; otherwise backend will block unauthorized calls
  const token = localStorage.getItem('token');
  let isAdmin = false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    isAdmin = payload.role === 'ADMIN';
  } catch {}

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/events');
      setEvents(data.events || data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-6">Loading events…</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Available Events</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            isAdmin={isAdmin}
            refreshEvents={fetchEvents}
          />
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------

function EventCard({ event, isAdmin, refreshEvents }) {
  const [slotsLeft, setSlotsLeft] = useState(null);
  const [booking, setBooking] = useState(false);

  // Fetch slots on mount
  useEffect(() => {
    let mounted = true;
    const fetchSlots = async () => {
      try {
        const { data } = await api.get(`/events/${event.id}/slots`);
        if (mounted) setSlotsLeft(data.slotsLeft);
      } catch {
        if (mounted) setSlotsLeft('—');
      }
    };
    fetchSlots();
    return () => { mounted = false; };
  }, [event.id]);

  // Handle booking
  const handleBook = async () => {
    setBooking(true);
    try {
      await api.post(`/events/${event.id}/book`);
      toast.success('Booked successfully!');
      // update slots
      const { data } = await api.get(`/events/${event.id}/slots`);
      setSlotsLeft(data.slotsLeft);
    } catch (err) {
      const msg = err.response?.data?.message;
      toast.error(msg === 'Sold out' ? 'Sorry, sold out.' : msg || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  // Handle delete (admin only)
  const handleDelete = async () => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await api.delete(`/events/${event.id}`);
      toast.success('Event deleted');
      refreshEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="border p-4 rounded shadow relative bg-white">
      {isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          title="Delete Event"
        >
          <Trash2 size={18} />
        </button>
      )}

      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
      <p className="text-sm mb-2">{event.description}</p>
      <p className="mb-1"><strong>Location:</strong> {event.location}</p>
      <p className="mb-1">
        <strong>Date:</strong> {new Date(event.date).toLocaleString()}
      </p>
      <p className="mb-2">
        <strong>Tags:</strong> {event.tags.join(', ')}
      </p>

      <p className="mb-4">
        <strong>Slots Left:</strong> {slotsLeft === null ? '…' : slotsLeft}
      </p>

      {!isAdmin && (
        <button
          onClick={handleBook}
          disabled={booking || slotsLeft <= 0}
          className={`w-full py-2 rounded ${
            slotsLeft > 0
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          {booking ? 'Booking…' : slotsLeft > 0 ? 'Book Event' : 'Sold Out'}
        </button>
      )}
    </div>
  );
}
