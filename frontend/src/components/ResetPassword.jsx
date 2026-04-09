import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleReset = () => {

    const { newPassword, confirmPassword } = form;

    if (!newPassword || !confirmPassword) {
      return alert("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    alert("Password updated successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-200 to-indigo-200">

      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-80">

        <h2 className="text-center text-xl font-bold mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-3 mb-3 rounded-lg"
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 mb-3 rounded-lg"
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />

        <button
          onClick={handleReset}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-lg"
        >
          Update Password
        </button>

      </div>
    </div>
  );
}