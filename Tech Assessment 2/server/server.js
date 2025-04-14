require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const weatherRoutes = require('./routes/weather');
const historyRoutes = require('./routes/history');
const youtubeRoutes = require('./routes/youtube');

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Update to match Vite's default port
  })
);
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/youtube', youtubeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Weather API!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));