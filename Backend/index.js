// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Body parser

// API Routes
app.get('/api/v1', (req, res) => {
  res.send('Stories API Running');
});

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/books', require('./routes/books'));
app.use('/api/v1/rentals', require('./routes/rentals'));
app.use('/api/v1/serve', require('./routes/serve'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));