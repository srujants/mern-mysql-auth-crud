import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001'
});

// ✅ Inject token automatically
API.interceptors.request.use((req) => {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

// ✅ Handle 401 (auto logout)
API.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default API;