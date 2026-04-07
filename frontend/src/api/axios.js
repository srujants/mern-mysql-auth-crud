import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5050'
});


API.interceptors.request.use((req) => {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (token) req.headers.Authorization = token;
  return req;
});


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