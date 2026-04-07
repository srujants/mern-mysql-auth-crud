import { useState } from 'react';
import { registerUser } from '../api/authApi';

function Register() {

  const [form, setForm] = useState({});

  const handleRegister = async () => {
    await registerUser(form);
    alert("Registered");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80 text-center">

        <h2 className="text-xl mb-4">Register</h2>

        <input className="border p-2 w-full mb-2"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input className="border p-2 w-full mb-2"
          placeholder="Phone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })} />

        <input type="password" className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button onClick={handleRegister}
          className="bg-green-500 text-white w-full p-2 rounded">
          Register
        </button>

      </div>
    </div>
  );
}

export default Register;