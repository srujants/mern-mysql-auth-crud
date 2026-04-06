import { useState } from 'react';
import API from '../api';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirm: ''
  });

  const handleRegister = async () => {
    if (form.password !== form.confirm) {
      return alert("Passwords do not match");
    }

    try {
      await API.post('/api/auth/register', form);
      alert("Registered successfully");
      window.location.href = "/";
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 shadow rounded w-80">

        <h2 className="text-xl mb-4 text-center">Register</h2>

        <input className="border w-full p-2 mb-2"
          placeholder="Name"
          onChange={e => setForm({...form, name: e.target.value})} />

        <input className="border w-full p-2 mb-2"
          placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})} />

        <input className="border w-full p-2 mb-2"
          placeholder="Phone"
          onChange={e => setForm({...form, phone: e.target.value})} />

        <input className="border w-full p-2 mb-2"
          type="password"
          placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})} />

        <input className="border w-full p-2 mb-2"
          type="password"
          placeholder="Confirm Password"
          onChange={e => setForm({...form, confirm: e.target.value})} />

        <button className="bg-green-500 text-white w-full p-2"
          onClick={handleRegister}>
          Register
        </button>

      </div>
    </div>
  );
}

export default Register;