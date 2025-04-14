require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weather');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Restrict to frontend during development
}));
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Weather API! Use /api/weather for weather data.' });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));