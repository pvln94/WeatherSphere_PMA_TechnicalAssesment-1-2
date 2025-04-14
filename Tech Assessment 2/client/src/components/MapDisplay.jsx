import React from 'react';

function MapDisplay({ latitude, longitude, location }) {
  if (!latitude || !longitude) return null;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Map of {location}</h2>
        <p className="text-red-600">Google Maps API key is missing</p>
      </div>
    );
  }

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=12`;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Map of {location}</h2>
      <iframe
        width="100%"
        height="300"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen
        title={`Map of ${location}`}
      ></iframe>
    </div>
  );
}

export default MapDisplay;