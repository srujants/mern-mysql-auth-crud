const db = require('../config/db');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    res.json({ message: "User registered" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = users[0];

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

   
    res.json({
      message: "Login successful ✅",
      token,
      user: {
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.resetPassword = async (req, res) => {
  console.log("🔵 Reset Password API hit");

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const [result] = await db.execute(
      "UPDATE users SET password=? WHERE email=?",
      [password, email]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    res.json({ message: "Password updated successfully ✅" });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};