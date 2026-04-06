import { useState } from 'react';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

const handleReset = () => {
  if (password !== confirm) {
    return alert("Passwords do not match");
  }

  alert("Password reset successful");

  window.location.href = "/";   // ✅ redirect to login
};
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 shadow rounded w-80">

        <h2 className="text-xl mb-4 text-center">Reset Password</h2>

        <input className="border w-full p-2 mb-2"
          type="password"
          placeholder="New Password"
          onChange={e => setPassword(e.target.value)} />

        <input className="border w-full p-2 mb-3"
          type="password"
          placeholder="Confirm Password"
          onChange={e => setConfirm(e.target.value)} />

        <button className="bg-green-500 text-white w-full p-2"
          onClick={handleReset}>
          Reset Password
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;