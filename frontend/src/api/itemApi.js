import API from './axios';

export const getItems = () => API.get('/api/items');
export const addItem = (data) => API.post('/api/items', data);
export const updateItem = (id, data) => API.put(`/api/items/${id}`, data);
export const deleteItem = (id) => API.delete(`/api/items/${id}`);