import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import InfoButton from './components/InfoButton';
import HistoryForm from './components/HistoryForm';
import HistoryDisplay from './components/HistoryDisplay';
import MapDisplay from './components/MapDisplay';
import VideoDisplay from './components/VideoDisplay';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('C');
  const [isDaytime, setIsDaytime] = useState(true);
  const [histories, setHistories] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const toggleUnit = () => setUnit(unit === 'C' ? 'F' : 'C');

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/history');
      setHistories(response.data);
    } catch (err) {
      console.error('History fetch error:', err);
      setError('Failed to load history');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (weatherData?.sys) {
      const currentTime = Date.now() / 1000;
      const sunrise = weatherData.sys.sunrise;
      const sunset = weatherData.sys.sunset;
      setIsDaytime(currentTime >= sunrise && currentTime <= sunset);
    }
  }, [weatherData]);

  const getBackgroundClass = () => {
    if (!weatherData) return 'bg-gradient-to-br from-blue-100 to-cyan-100';
    const main = weatherData.weather[0].main.toLowerCase();
    const bgMap = {
      rain: 'bg-gradient-to-br from-gray-300 to-blue-400',
      clouds: 'bg-gradient-to-br from-gray-200 to-blue-300',
      clear: isDaytime
        ? 'bg-gradient-to-br from-yellow-200 via-blue-400 to-blue-600'
        : 'bg-gradient-to-br from-indigo-900 via-gray-800 to-blue-900',
      snow: 'bg-gradient-to-br from-blue-100 to-gray-100',
    };
    return bgMap[main] || 'bg-gradient-to-br from-blue-100 to-cyan-100';
  };

  return (
    <div
      className={`min-h-screen ${getBackgroundClass()} transition-all duration-700 ease-in-out flex flex-col items-center justify-center px-6 py-8 sm:px-10`}
    >
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl ring-1 ring-gray-200 hover:ring-blue-300 transition-all duration-300">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 py-5 px-6 sm:px-8 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              WeatherSphere
            </h1>
            <InfoButton />
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <InputForm
            setWeatherData={setWeatherData}
            setForecastData={setForecastData}
            setError={setError}
          />
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm font-medium shadow-sm">
              {error}
            </div>
          )}
          {weatherData && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <WeatherDisplay
                weatherData={weatherData}
                unit={unit}
                toggleUnit={toggleUnit}
              />
              <Forecast forecastData={forecastData} unit={unit} />
            </div>
          )}
          <HistoryForm
            selectedHistory={selectedHistory}
            setSelectedHistory={setSelectedHistory}
            fetchHistory={fetchHistory}
          />
          <HistoryDisplay
            histories={histories}
            setSelectedHistory={setSelectedHistory}
            fetchHistory={fetchHistory}
          />
          {weatherData && (
            <>
              <MapDisplay
                latitude={weatherData.coord?.lat}
                longitude={weatherData.coord?.lon}
                location={weatherData.name}
              />
              <VideoDisplay location={weatherData.name} />
            </>
          )}
        </div>
        {!weatherData && (
          <div className="px-6 py-5 bg-white/60 backdrop-blur-md border-t border-gray-300 text-center text-sm text-gray-700 rounded-b-3xl">
            <p className="font-medium italic">
              Start by entering a city name to get the latest weather ☁️
            </p>
          </div>
        )}
      </div>
      <div className="mt-6 text-xs text-white/80 text-center">
        <p>
          Weather data powered by{' '}
          <a
            href="https://openweathermap.org/api"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-400"
          >
            OpenWeatherMap
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;