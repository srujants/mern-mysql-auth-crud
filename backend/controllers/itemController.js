const db = require('../config/db');

// ➕ CREATE ITEM
exports.createItem = async (req, res) => {
  const { title, description } = req.body;

  try {
    await db.query(
      "INSERT INTO items (user_id, title, description) VALUES (?, ?, ?)",
      [req.user.id, title, description]
    );

    res.json({ message: "Item created ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating item" });
  }
};

// 📄 GET ALL ITEMS
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

// ✏️ UPDATE ITEM
exports.updateItem = async (req, res) => {
  const { title, description } = req.body;

  try {
    await db.query(
      "UPDATE items SET title = ?, description = ? WHERE id = ? AND user_id = ?",
      [title, description, req.params.id, req.user.id]
    );

    res.json({ message: "Item updated ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating item" });
  }
};

// ❌ DELETE ITEM
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