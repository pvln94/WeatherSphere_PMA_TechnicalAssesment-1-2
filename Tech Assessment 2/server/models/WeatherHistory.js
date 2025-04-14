const mongoose = require('mongoose');

const WeatherHistorySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  dateRange: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  temperatures: [
    {
      date: {
        type: Date,
        required: true,
      },
      temp: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        trim: true,
      },
      icon: {
        type: String,
        trim: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('WeatherHistory', WeatherHistorySchema);