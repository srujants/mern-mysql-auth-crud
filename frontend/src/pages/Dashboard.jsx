import { useEffect, useState } from 'react';
import API from '../api';

function Dashboard() {

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'active'
  });

  const username = "Srujan";

  const fetchItems = async () => {
    try {
      const res = await API.get('/api/items');
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
    } else {
      fetchItems();
    }
  }, []);

  const addItem = async () => {
    try {
      await API.post('/api/items', form);
      setForm({ title: '', description: '', status: 'active' });
      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (id) => {
    if (!confirm("Are you sure?")) return;

    await API.delete(`/api/items/${id}`);
    fetchItems();
  };

  // ✏️ UPDATED EDIT (TITLE + DESCRIPTION POPUP)
  const editItem = async (item) => {
    const newTitle = prompt("Edit title", item.title);
    if (!newTitle) return;

    const newDescription = prompt("Edit description", item.description);
    if (newDescription === null) return;

    await API.put(`/api/items/${item.id}`, {
      ...item,
      title: newTitle,
      description: newDescription
    });

    fetchItems();
  };

  const updateStatus = async (item, newStatus) => {
    await API.put(`/api/items/${item.id}`, {
      ...item,
      status: newStatus
    });

    fetchItems();
  };

  const total = items.length;
  const active = items.filter(i => i.status === "active").length;
  const pending = items.filter(i => i.status === "pending").length;
  const completed = items.filter(i => i.status === "completed").length;

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">

      {/* Navbar */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 shadow-lg rounded-xl">
        <h1 className="text-xl font-bold text-blue-600">Welcome, {username}</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-300 p-4 rounded-xl shadow text-center font-semibold">Total: {total}</div>
        <div className="bg-green-300 p-4 rounded-xl shadow text-center font-semibold">Active: {active}</div>
        <div className="bg-yellow-300 p-4 rounded-xl shadow text-center font-semibold">Pending: {pending}</div>
        <div className="bg-purple-300 p-4 rounded-xl shadow text-center font-semibold">Completed: {completed}</div>
      </div>

      {/* Add Form */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="mb-3 font-semibold text-gray-700">Add Item</h2>

        <input
          className="border p-2 mr-2 mb-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="border p-2 mr-2 mb-2 rounded-lg focus:ring-2 focus:ring-blue-400"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="border p-2 mr-2 mb-2 rounded-lg"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={addItem}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Items */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="mb-3 font-semibold text-gray-700">Items</h2>

        {items.map(item => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-3 mb-2 rounded-lg hover:bg-gray-50 transition"
          >
            <div>
              <h3 className="font-bold text-blue-700">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>

              <select
                className="border mt-1 rounded"
                value={item.status}
                onChange={(e) => updateStatus(item, e.target.value)}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <button
                onClick={() => editItem(item)}
                className="mr-3 text-blue-500 hover:text-blue-700"
              >
                ✏️
              </button>

              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;