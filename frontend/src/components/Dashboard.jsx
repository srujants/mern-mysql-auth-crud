import { useEffect, useState } from "react";
import { getItems, addItem, deleteItem, updateItem } from "../api/itemApi";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {

  const { user, logout } = useAuth();

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});


  const fetchItems = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);


  const handleAdd = async () => {

    if (!form.title || !form.description) {
      return alert("Title and Description required");
    }

    await addItem({
      ...form,
      status: "active"
    });

    setForm({ title: "", description: "" });
    fetchItems();
  };


  const handleDelete = async (id) => {
    if (confirm("Delete item?")) {
      await deleteItem(id);
      fetchItems();
    }
  };


  const handleStatus = async (item, status) => {
    await updateItem(item.id, { ...item, status });
    fetchItems();
  };


  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditForm(item);
  };


  const handleUpdate = async () => {

    if (!editForm.title || !editForm.description) {
      return alert("Fields cannot be empty");
    }

    await updateItem(editingId, editForm);
    setEditingId(null);
    fetchItems();
  };


  const statusColor = (status) => {
    if (status === "completed") return "bg-green-100 text-green-600";
    if (status === "pending") return "bg-yellow-100 text-yellow-600";
    return "bg-blue-100 text-blue-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">

     
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-gray-700">
          Welcome, <span className="text-indigo-600">{user?.name}</span>
        </h2>

        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          Logout
        </button>

      </div>

      
      <div className="grid grid-cols-3 gap-5 mb-6">

        <div className="bg-white/70 backdrop-blur-lg p-5 rounded-xl shadow-lg">
          <p className="text-gray-500">Total Tasks</p>
          <h3 className="text-2xl font-bold">{items.length}</h3>
        </div>

        <div className="bg-white/70 backdrop-blur-lg p-5 rounded-xl shadow-lg">
          <p className="text-gray-500">Completed</p>
          <h3 className="text-green-500 text-2xl font-bold">
            {items.filter(i => i.status === "completed").length}
          </h3>
        </div>

        <div className="bg-white/70 backdrop-blur-lg p-5 rounded-xl shadow-lg">
          <p className="text-gray-500">Pending</p>
          <h3 className="text-yellow-500 text-2xl font-bold">
            {items.filter(i => i.status === "pending").length}
          </h3>
        </div>

      </div>

      
      <div className="bg-white/80 backdrop-blur-lg p-5 rounded-xl shadow-lg mb-6">

        <input
          placeholder="Enter title..."
          className="w-full border p-3 mb-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Enter description..."
          className="w-full border p-3 mb-3 rounded-lg focus:ring-2 focus:ring-indigo-400"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button
          onClick={handleAdd}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-lg shadow hover:scale-105 transition"
        >
          Add Task
        </button>

      </div>

   
      <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-5">

        {items.length === 0 && (
          <p className="text-center text-gray-400">No tasks available</p>
        )}

        {items.map(item => (
          <div
            key={item.id}
            className="p-4 mb-3 bg-white rounded-lg shadow hover:shadow-md transition"
          >

            {editingId === item.id ? (

              <>
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="border p-2 mb-2 w-full rounded"
                />

                <input
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="border p-2 mb-2 w-full rounded"
                />

                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </>

            ) : (

              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>

                  <span className={`text-xs px-3 py-1 rounded-full mt-1 inline-block ${statusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex gap-2 items-center">

                  
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>

                 
                  <select
                    value={item.status}
                    onChange={(e) => handleStatus(item, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option>active</option>
                    <option>pending</option>
                    <option>completed</option>
                  </select>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}