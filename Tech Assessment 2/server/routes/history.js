const express = require('express');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const WeatherHistory = require('../models/WeatherHistory');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const router = express.Router();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';

if (!API_KEY) {
  console.error('OPENWEATHER_API_KEY is not set');
}

const validateHistory = [
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('startDate').isISO8601().toDate().withMessage('Invalid start date'),
  body('endDate')
    .isISO8601()
    .toDate()
    .withMessage('Invalid end date')
    .custom((endDate, { req }) => {
      const start = new Date(req.body.startDate);
      const end = new Date(endDate);
      if (end < start) {
        throw new Error('End date must be after start date');
      }
      if (end > new Date()) {
        throw new Error('End date cannot be in the future');
      }
      return true;
    }),
];

const validateLocation = async (location) => {
  try {
    const response = await axios.get(`${WEATHER_URL}?q=${location}&appid=${API_KEY}&units=metric`);
    return {
      valid: true,
      latitude: response.data.coord.lat,
      longitude: response.data.coord.lon,
      name: response.data.name,
    };
  } catch (error) {
    return { valid: false, error: error.response?.data?.message || 'Invalid location' };
  }
};

router.post('/', validateHistory, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { location, startDate, endDate } = req.body;

  const locationData = await validateLocation(location);
  if (!locationData.valid) {
    return res.status(400).json({ error: locationData.error });
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const temperatures = [];
    const currentWeather = await axios.get(
      `${WEATHER_URL}?lat=${locationData.latitude}&lon=${locationData.longitude}&appid=${API_KEY}&units=metric`
    );

    // Simulate historical data (since OpenWeatherMap free API doesn't provide it)
    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      const tempVariation = (Math.random() - 0.5) * 4; // Random variation +/- 2°C
      temperatures.push({
        date: new Date(date),
        temp: currentWeather.data.main.temp + tempVariation,
        description: currentWeather.data.weather[0].description,
        icon: currentWeather.data.weather[0].icon,
      });
    }

    const history = new WeatherHistory({
      location: locationData.name,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      dateRange: { startDate, endDate },
      temperatures,
    });

    await history.save();
    res.status(201).json(history);
  } catch (error) {
    console.error('Save history error:', error);
    res.status(500).json({ error: 'Failed to save weather history' });
  }
});

router.get('/', async (req, res) => {
  try {
    const histories = await WeatherHistory.find().sort({ createdAt: -1 });
    res.json(histories);
  } catch (error) {
    console.error('Fetch history error:', error);
    res.status(500).json({ error: 'Failed to fetch weather history' });
  }
});

router.put('/:id', validateHistory, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { location, startDate, endDate } = req.body;

  const locationData = await validateLocation(location);
  if (!locationData.valid) {
    return res.status(400).json({ error: locationData.error });
  }

  try {
    const history = await WeatherHistory.findById(req.params.id);
    if (!history) {
      return res.status(404).json({ error: 'Record not found' });
    }

    history.location = locationData.name;
    history.latitude = locationData.latitude;
    history.longitude = locationData.longitude;
    history.dateRange = { startDate, endDate };
    history.updatedAt = new Date();

    const start = new Date(startDate);
    const end = new Date(endDate);
    const temperatures = [];
    const currentWeather = await axios.get(
      `${WEATHER_URL}?lat=${locationData.latitude}&lon=${locationData.longitude}&appid=${API_KEY}&units=metric`
    );

    // Simulate historical data
    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      const tempVariation = (Math.random() - 0.5) * 4;
      temperatures.push({
        date: new Date(date),
        temp: currentWeather.data.main.temp + tempVariation,
        description: currentWeather.data.weather[0].description,
        icon: currentWeather.data.weather[0].icon,
      });
    }
    history.temperatures = temperatures;

    await history.save();
    res.json(history);
  } catch (error) {
    console.error('Update history error:', error);
    res.status(500).json({ error: 'Failed to update weather history' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const history = await WeatherHistory.findByIdAndDelete(req.params.id);
    if (!history) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Delete history error:', error);
    res.status(500).json({ error: 'Failed to delete weather history' });
  }
});

router.get('/export', async (req, res) => {
  const { format } = req.query;

  try {
    const histories = await WeatherHistory.find();

    if (format === 'csv') {
      const csvWriter = createCsvWriter({
        path: 'weather_history.csv',
        header: [
          { id: 'location', title: 'Location' },
          { id: 'latitude', title: 'Latitude' },
          { id: 'longitude', title: 'Longitude' },
          { id: 'startDate', title: 'Start Date' },
          { id: 'endDate', title: 'End Date' },
          { id: 'temperatures', title: 'Temperatures' },
        ],
      });

      const records = histories.map((h) => ({
        location: h.location,
        latitude: h.latitude,
        longitude: h.longitude,
        startDate: h.dateRange.startDate.toISOString(),
        endDate: h.dateRange.endDate.toISOString(),
        temperatures: h.temperatures
          .map((t) => `${t.date.toISOString()}: ${t.temp}°C`)
          .join('; '),
      }));

      await csvWriter.writeRecords(records);

      res.download('weather_history.csv', 'weather_history.csv', (err) => {
        if (err) {
          console.error('CSV download error:', err);
        }
      });
    } else {
      res.json(histories);
    }
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

module.exports = router;