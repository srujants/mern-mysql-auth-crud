import { useState } from 'react';

function ForgotPassword() {

  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    alert("Reset link sent");
    window.location.href = `/reset?email=${email}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-80 text-center">

        <h2 className="text-lg mb-4">Forgot Password</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Send Reset Link
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;