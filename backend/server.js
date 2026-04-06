const express = require('express');
const cors = require('cors');
require('dotenv').config();

// DB connection
require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes'); // ✅ THIS LINE

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send("Server Running Successfully 🚀");
});

// Auth routes
app.use('/api/auth', authRoutes);

// ✅ Items routes (VERY IMPORTANT)
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});