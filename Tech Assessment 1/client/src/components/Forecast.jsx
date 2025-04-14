import React from 'react';

function Forecast({ forecastData, unit }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">5-Day Weather Forecast</h2>
      <div className="grid grid-cols-5 gap-6"> {/* Change grid-cols to 5 */}
        {forecastData.map((day, index) => {
          const temp = unit === 'C' ? day.main.temp : (day.main.temp * 9) / 5 + 32;
          const date = new Date(day.dt * 1000).toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });

          return (
            <div key={index} className="bg-blue-50 p-4 rounded-xl shadow-md flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-700 mb-2">{date}</p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="w-16 h-16 mb-2"
              />
              <p className="text-xl font-bold text-blue-600">
                {temp.toFixed(1)}°{unit}
              </p>
              <p className="text-sm text-gray-600 capitalize mt-1">{day.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
