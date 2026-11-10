require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api', require('./routes/mentorRoutes'));
app.use('/api/m', require('./routes/menteeRoutes'));

// Test route
app.get('/', (req, res) => {
    res.send('Mentorship API Running');
});

// Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
