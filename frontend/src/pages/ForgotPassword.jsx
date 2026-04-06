import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');

 const handleSubmit = () => {
  alert("Reset link sent (demo)");
  window.location.href = "/reset";   // ✅ ADD THIS LINE
};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 shadow rounded w-80">

        <h2 className="text-xl mb-4 text-center">Forgot Password</h2>

        <input className="border w-full p-2 mb-3"
          placeholder="Enter Email"
          onChange={e => setEmail(e.target.value)} />

        <button className="bg-blue-500 text-white w-full p-2"
          onClick={handleSubmit}>
          Send Reset Link
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;