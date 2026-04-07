require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

app.get('/', (req, res) => {
  res.send("Server Running Successfully 🚀");
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});