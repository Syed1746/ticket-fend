import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEvent from './components/createEvent';
import EventList from './components/EventList';
import EditEvent from './components/EditEvent';
import AdminEventBookings from './components/AdminEventBookings';
import LandingPage from './components/LandingPage'; // ⬅️ new import

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/create-event" element={<CreateEvent />} />
          <Route path="/admin/event-bookings/:id" element={<AdminEventBookings />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/admin/edit-event/:id" element={<EditEvent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
