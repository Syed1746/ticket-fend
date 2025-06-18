import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function EditEvent() {
  const { id } = useParams(); // get event ID from route
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    totalSlots: '',
    tags: '',
    image: ''
  });

  useEffect(() => {
    // Fetch existing event data
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setForm({
          ...data,
          tags: data.tags?.join(', '),
          date: data.date?.slice(0, 16) // format for datetime-local
        });
      } catch (err) {
        toast.error('Failed to load event data');
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        totalSlots: parseInt(form.totalSlots),
        tags: form.tags.split(',').map(t => t.trim())
      };
      await api.put(`/events/${id}`, payload);
      toast.success('Event updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'description', 'location', 'date', 'totalSlots', 'image', 'tags'].map((field) => (
          <input
            key={field}
            type={field === 'date' ? 'datetime-local' : 'text'}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-2 border rounded"
            required={field !== 'image'}
          />
        ))}
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Update Event</button>
      </form>
    </div>
  );
}
