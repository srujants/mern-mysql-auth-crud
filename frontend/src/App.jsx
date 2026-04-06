import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {

  const getToken = () =>
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const token = getToken();

  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ If token exists → go dashboard */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* ✅ Protect dashboard */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;