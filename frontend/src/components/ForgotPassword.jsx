import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

const handleSubmit = () => {

  if (!email) {
    return alert("Email is required");
  }

  alert("Reset link sent!");
  navigate("/reset");
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200">

      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-80">

        <h2 className="text-center text-xl font-bold mb-4">Forgot Password</h2>

        <input
          placeholder="Enter Email"
          className="w-full border p-3 mb-3 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-lg"
        >
          Send Reset Link
        </button>

      </div>
    </div>
  );
}