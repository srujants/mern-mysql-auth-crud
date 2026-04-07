const db = require('../config/db');


exports.createItem = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    await db.query(
      "INSERT INTO items (user_id, title, description, status) VALUES (?, ?, ?, ?)",
      [req.user.id, title, description, status || 'active'] // ✅ FIX
    );

    res.json({ message: "Item created ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating item" });
  }
};


exports.getItems = async (req, res) => {
  try {
    const [items] = await db.query(
      "SELECT * FROM items WHERE user_id = ?",
      [req.user.id]
    );

    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching items" });
  }
};


exports.updateItem = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    await db.query(
      "UPDATE items SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?",
      [title, description, status, req.params.id, req.user.id] // ✅ FIX
    );

    res.json({ message: "Item updated ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating item" });
  }
};


exports.deleteItem = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM items WHERE id = ? AND user_id = ?",
      [req.params.id, req.user.id]
    );

    res.json({ message: "Item deleted ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting item" });
  }
};