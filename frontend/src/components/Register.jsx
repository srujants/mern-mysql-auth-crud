import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {

  const [form, setForm] = useState({});
  const navigate = useNavigate();

const handleRegister = async () => {

  const { name, email, phone, password, confirmPassword } = form;

  if (!name || !email || !phone || !password || !confirmPassword) {
    return alert("All fields are required");
  }

  if (password !== confirmPassword) {
    return alert("Passwords do not match");
  }

  try {
    await registerUser(form);
    alert("Registered successfully!");
    navigate("/");
  } catch {
    alert("Registration failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">

      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-80">

        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>

        {["Name","Email","Phone","Password","Confirm Password"].map(field => (
          <input
            key={field}
            type={field.includes("password") ? "password" : "text"}
            placeholder={field}
            className="w-full border p-3 mb-3 rounded-lg"
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}

        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-lg"
        >
          Register
        </button>

        <p className="text-center text-sm mt-3">
          Already have account?{" "}
          <span onClick={() => navigate("/")} className="text-indigo-600 cursor-pointer">
            Login
          </span>
        </p>

      </div>
    </div>
  );
}