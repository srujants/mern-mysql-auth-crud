import API from './axios';

export const loginUser = (data) => API.post('/api/auth/login', data);
export const registerUser = (data) => API.post('/api/auth/register', data);
export const resetPassword = (data) =>
  API.post('/api/auth/reset-password', data);