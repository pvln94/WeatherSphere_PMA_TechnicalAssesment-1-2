import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VideoDisplay({ location }) {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!location) {
      setVideos([]);
      return;
    }

    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/youtube', {
          params: { q: location },
        });
        setVideos(response.data.items || []);
        setError('');
      } catch (err) {
        console.error('Video fetch error:', err);
        setError('Failed to load videos');
        setVideos([]);
      }
    };

    fetchVideos();
  }, [location]);

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Videos about {location}</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!videos.length) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl">
      <h2 className="text-xl font-bold mb-4">Videos about {location}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div key={video.id.videoId} className="border rounded-xl p-2">
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <p className="mt-2 text-sm">{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoDisplay;