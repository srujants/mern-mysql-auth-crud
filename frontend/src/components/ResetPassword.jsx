import { useState } from 'react';
import { resetPassword } from '../api/authApi';

function ResetPassword() {

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const email = new URLSearchParams(window.location.search).get("email");

  const handleReset = async () => {
    if (password !== confirm) return alert("Passwords mismatch");

    await resetPassword({ email, password });

    alert("Password updated");
    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-center mb-4">Reset Password</h2>

        <input type="password"
          className="border p-2 w-full mb-2"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)} />

        <input type="password"
          className="border p-2 w-full mb-3"
          placeholder="Confirm Password"
          onChange={(e) => setConfirm(e.target.value)} />

        <button
          onClick={handleReset}
          className="bg-green-500 text-white w-full p-2 rounded">
          Reset
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;