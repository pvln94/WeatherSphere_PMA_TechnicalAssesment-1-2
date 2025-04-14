import React, { useState } from 'react';
import axios from 'axios';

function InputForm({ setWeatherData, setForecastData, setError }) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let query = input.trim();
      let currentResponse, forecastResponse;

      if (/^-?\d+\.\d+,-?\d+\.\d+$/.test(query)) {
        const [lat, lon] = query.split(',');
        currentResponse = await axios.get('http://localhost:5000/api/weather/current', {
          params: { lat, lon },
        });
        forecastResponse = await axios.get('http://localhost:5000/api/weather/forecast', {
          params: { lat, lon },
        });
      } else if (/^\d{5}$/.test(query)) {
        currentResponse = await axios.get('http://localhost:5000/api/weather/current', {
          params: { q: `zip:${query}` },
        });
        forecastResponse = await axios.get('http://localhost:5000/api/weather/forecast', {
          params: { q: `zip:${query}` },
        });
      } else {
        currentResponse = await axios.get('http://localhost:5000/api/weather/current', {
          params: { q: query },
        });
        forecastResponse = await axios.get('http://localhost:5000/api/weather/forecast', {
          params: { q: query },
        });
      }

      const currentData = currentResponse.data;
      const forecastData = forecastResponse.data;

      setWeatherData(currentData);

      const dailyForecast = [];
      const seenDates = new Set();
      for (const entry of forecastData.list) {
        const date = new Date(entry.dt * 1000).toLocaleDateString();
        const hour = new Date(entry.dt * 1000).getHours();
        if (!seenDates.has(date) && hour >= 12 && hour <= 15) {
          dailyForecast.push(entry);
          seenDates.add(date);
        }
        if (dailyForecast.length >= 5) break;
      }

      setForecastData(dailyForecast);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(
        err.response?.status === 404
          ? 'Location not found'
          : err.response?.status === 400
          ? err.response.data.error || 'Invalid input format'
          : 'Failed to fetch weather data. Please try again.'
      );
    }
  };

  const handleGeolocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const currentResponse = await axios.get('http://localhost:5000/api/weather/current', {
              params: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              },
            });
            const forecastResponse = await axios.get('http://localhost:5000/api/weather/forecast', {
              params: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              },
            });

            const currentData = currentResponse.data;
            const forecastData = forecastResponse.data;

            setWeatherData(currentData);

            const dailyForecast = [];
            const seenDates = new Set();
            for (const entry of forecastData.list) {
              const date = new Date(entry.dt * 1000).toLocaleDateString();
              const hour = new Date(entry.dt * 1000).getHours();
              if (!seenDates.has(date) && hour >= 12 && hour <= 15) {
                dailyForecast.push(entry);
                seenDates.add(date);
              }
              if (dailyForecast.length >= 5) break;
            }

            setForecastData(dailyForecast);
            setError('');
          } catch (err) {
            console.error(err.response?.data || err.message);
            setError(
              err.response?.status === 404
                ? 'Location not found'
                : err.response?.status === 400
                ? err.response.data.error || 'Invalid coordinates'
                : 'Failed to fetch weather for current location'
            );
          }
        },
        () => setError('Geolocation permission denied')
      );
    } else {
      setError('Geolocation not supported');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center gap-6">
      {/* Input field */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city, zip, or coordinates (e.g., 40.7128,-74.0060)"
        style={{
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '12px',
          paddingBottom: '12px',
          marginTop: '8px',
          marginBottom: '8px',
          border: '1px solid #d1d5db',
          borderRadius: '0.75rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '28rem',
          transition: 'all 0.3s ease',
        }}
        className="focus:outline-none focus:ring-2 focus:ring-blue-400"
      />


      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <p>

        </p>
        <button
          type="submit"
          style={{
            backgroundColor: '#2563eb', // bg-blue-600
            color: '#ffffff', // text-white
            padding: '12px 24px', // px-6 py-3
            margin: '4px 4px', // mx-1 my-1
            borderRadius: '0.75rem', // rounded-xl
            fontWeight: '500', // font-medium
            transition: 'all 0.3s ease', // transition
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 mx-1 my-1 rounded-xl font-medium transition"
          // px, py = padding | mx, my = margin
        >
          Get Weather
        </button>
        <p>
          Try by:
        </p>
        <button
          type="button"
          style={{
            backgroundColor: '#2563eb', // bg-blue-600
            color: '#ffffff', // text-white
            padding: '12px 24px', // px-6 py-3
            margin: '4px 4px', // mx-1 my-1
            borderRadius: '0.75rem', // rounded-xl
            fontWeight: '500', // font-medium
            transition: 'all 0.3s ease', // transition
          }}
          onClick={handleGeolocation}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 mx-1 my-1 rounded-xl font-medium transition"
        >
          Use Current Location
        </button>
      </div>
    </form>
  );
}

export default InputForm;
