import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

const handleLogin = async () => {
  try {
    const res = await API.post('/api/auth/login', { email, password });

    console.log("Response:", res.data);

    // ✅ CLEAR OLD TOKEN (VERY IMPORTANT)
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // ✅ STORE NEW TOKEN BASED ON REMEMBER
    if (remember) {
      localStorage.setItem("token", res.data.token);
      console.log("Saved in localStorage");
    } else {
      sessionStorage.setItem("token", res.data.token);
      console.log("Saved in sessionStorage");
    }

    // ✅ REDIRECT
    window.location.href = "/dashboard";

  } catch (err) {
    console.log(err);
    alert("Login failed ❌");
  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 shadow rounded w-80">

        <h2 className="text-xl mb-4 text-center font-semibold">Login</h2>

        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border w-full p-2 mb-3 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember Me */}
        <div className="flex justify-between mb-3 text-sm">
          <label>
            <input
              type="checkbox"
              onChange={(e) => setRemember(e.target.checked)}
            />{" "}
            Remember me
          </label>

          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/forgot')}
          >
            Forgot?
          </span>
        </div>

        <button
          className="bg-blue-500 text-white w-full p-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center mt-3 text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;