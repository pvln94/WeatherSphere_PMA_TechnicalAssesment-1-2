const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast';

router.get('/current', async (req, res) => {
  const { q, lat, lon } = req.query;

  // Input validation
  if (!q && !(lat && lon)) {
    return res.status(400).json({ error: 'Please provide a city name (q) or coordinates (lat, lon)' });
  }
  if (lat && (isNaN(lat) || lat < -90 || lat > 90) || lon && (isNaN(lon) || lon < -180 || lon > 180)) {
    return res.status(400).json({ error: 'Invalid coordinates: lat must be -90 to 90, lon must be -180 to 180' });
  }

  try {
    let url;
    if (lat && lon) {
      url = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else {
      url = `${WEATHER_URL}?q=${q}&appid=${API_KEY}&units=metric`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Error fetching current weather data',
    });
  }
});

router.get('/forecast', async (req, res) => {
  const { q, lat, lon } = req.query;

  // Input validation
  if (!q && !(lat && lon)) {
    return res.status(400).json({ error: 'Please provide a city name (q) or coordinates (lat, lon)' });
  }
  if (lat && (isNaN(lat) || lat < -90 || lat > 90) || lon && (isNaN(lon) || lon < -180 || lon > 180)) {
    return res.status(400).json({ error: 'Invalid coordinates: lat must be -90 to 90, lon must be -180 to 180' });
  }

  try {
    let url;
    if (lat && lon) {
      url = `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else {
      url = `${FORECAST_URL}?q=${q}&appid=${API_KEY}&units=metric`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || 'Error fetching forecast data',
    });
  }
});

module.exports = router;