import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { loginUser } from "../api/authApi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    if (!form.email || !form.password) {
      return alert("Please fill all fields");
    }

    const res = await loginUser(form);

    console.log("LOGIN RESPONSE:", res.data); // DEBUG

    login(res.data.token, true, res.data.user);

    // ✅ FORCE NAVIGATION (WORKS ALWAYS)
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 100);

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">

      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-80">

        <h2 className="text-center text-2xl font-bold mb-4 text-gray-700">Login</h2>

        <input
          className="w-full border p-3 mb-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full border p-3 mb-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-lg shadow hover:scale-105 transition"
        >
          Login
        </button>

        <p
  onClick={() => navigate("/forgot")}
  className="text-center text-sm text-indigo-600 cursor-pointer mt-2"
>
  Forgot Password?
</p>

<p className="text-center text-sm mt-2">
  Don’t have an account?{" "}
  <span
    onClick={() => navigate("/register")}
    className="text-indigo-600 cursor-pointer"
  >
    Register
  </span>
</p>

      </div>
    </div>
  );
}