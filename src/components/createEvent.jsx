import { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    totalSlots: '',
    tags: '',
    image: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        totalSlots: parseInt(form.totalSlots),
        date: new Date(form.date).toISOString(), // 🟢 Convert to full ISO string
        tags: form.tags.split(',').map(tag => tag.trim())
      };
  
      await api.post('/events', payload);
      toast.success('Event created successfully!');
      setForm({
        title: '',
        description: '',
        location: '',
        date: '',
        totalSlots: '',
        tags: '',
        image: ''
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Event creation failed');
    }
  };
  

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
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
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">Create Event</button>
      </form>
    </div>
  );
}
