import { useState } from 'react';
import { loginUser } from '../api/authApi';
import useAuth from '../hooks/useAuth';

function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });

const handleLogin = async () => {
  try {
    const res = await loginUser(form);

   
    login(
      res.data.token,
      true,
      res.data.user
    );

    window.location.href = "/dashboard";

  } catch {
    alert("Login failed");
  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded shadow-md w-80 text-center">

        <h2 className="text-2xl font-bold mb-6">Login</h2>

        {/* INPUTS LINE BY LINE */}
        <div className="flex flex-col gap-3">

          <input
            type="text"
            placeholder="Email"
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>

        </div>

        {/* LINKS */}
        <div className="mt-4 text-sm">
          <a href="/forgot" className="text-blue-500 block mb-2">
            Forgot Password?
          </a>

          <p>
            Don’t have an account?{" "}
            <a href="/register" className="text-green-500 font-semibold">
              Register
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;