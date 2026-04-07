import { useEffect, useState } from 'react';
import { getItems, addItem, updateItem, deleteItem } from '../api/itemApi';
import useAuth from '../hooks/useAuth';

function Dashboard() {

  const { logout, user } = useAuth();

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'active'
  });


  const fetchItems = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);


  const handleAdd = async () => {
    if (!form.title || !form.description) {
      return alert("Fill all fields");
    }

    await addItem({
      title: form.title,
      description: form.description,
      status: form.status 
    });

    setForm({ title: '', description: '', status: 'active' });
    fetchItems();
  };


  const handleDelete = async (id) => {
    if (confirm("Delete item?")) {
      await deleteItem(id);
      fetchItems();
    }
  };


  const handleEdit = async (item) => {

    const newTitle = prompt("Edit Title", item.title);
    if (newTitle === null) return;

    const newDesc = prompt("Edit Description", item.description);
    if (newDesc === null) return;

    await updateItem(item.id, {
      ...item,
      title: newTitle,
      description: newDesc
    });

    fetchItems();
  };


  const handleStatus = async (item, status) => {

    await updateItem(item.id, {
      title: item.title,
      description: item.description,
      status: status 
    });

    fetchItems();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔝 TOP */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            Welcome, {user?.name || "User"}
          </h2>
          <p className="text-sm text-gray-500">Dashboard</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex justify-center gap-6">

        {/* FORM */}
        <div className="bg-white p-4 rounded shadow w-80 flex flex-col gap-2">

          <h3 className="text-center font-semibold mb-2">Add Item</h3>

          <input
            placeholder="Title"
            className="border p-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="Description"
            className="border p-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            className="border p-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="active">active</option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>

          <button
            onClick={handleAdd}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add
          </button>

        </div>

        {/* TABLE */}
        <div className="bg-white p-4 rounded shadow w-[650px]">

          <h3 className="text-center font-semibold mb-3">Items</h3>

          <table className="w-full border text-center">

            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-3 text-gray-400">
                    No items
                  </td>
                </tr>
              ) : (
                items.map(item => (
                  <tr key={item.id} className="border hover:bg-gray-50">

                    {/* TITLE */}
                    <td className="p-2">{item.title}</td>

                    {/* DESCRIPTION */}
                    <td className="p-2 text-gray-600">
                      {item.description}
                    </td>

                    {/* STATUS */}
                    <td className="p-2">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatus(item, e.target.value)
                        }
                        className="border"
                      >
                        <option value="active">active</option>
                        <option value="pending">pending</option>
                        <option value="completed">completed</option>
                      </select>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-2 space-x-2">

                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-500"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;