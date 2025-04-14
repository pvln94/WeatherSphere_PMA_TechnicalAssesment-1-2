import React from 'react';

function WeatherDisplay({ weatherData, unit, toggleUnit }) {
  if (!weatherData || !weatherData.main || !weatherData.weather || !weatherData.wind) {
    return null;
  }

  const temp =
    unit === 'C' ? weatherData.main.temp : (weatherData.main.temp * 9) / 5 + 32;

  const travelTip =
    temp < 10
      ? 'Pack a jacket for the cold weather!'
      : temp > 25
      ? 'Wear sunscreen and stay hydrated!'
      : 'Comfortable weather, enjoy your trip!';

  // Capitalize the first letter of the condition
  const condition =
    weatherData.weather[0].description.charAt(0).toUpperCase() +
    weatherData.weather[0].description.slice(1);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg mb-4 w-full max-w-md transition-all duration-300">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Current Weather in {weatherData.name || 'Your Location'}
      </h2>

      <div className="flex items-center justify-between">
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={condition}
          className="w-20 h-20"
        />
        <div className="ml-4 flex-1">
          <p className="text-lg font-medium">
            Temperature: {temp.toFixed(1)}°{unit}
            <button
              onClick={toggleUnit}
              className="ml-2 text-sm text-blue-600 underline focus:outline-none"
              aria-label="Toggle temperature unit"
            >
              Switch to °{unit === 'C' ? 'F' : 'C'}
            </button>
          </p>
          <p className="text-md">Condition: {condition}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {(weatherData.wind.speed * 3.6).toFixed(1)} km/h</p>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-green-600 font-semibold">
        {travelTip}
      </p>
    </div>
  );
}

export default WeatherDisplay;
