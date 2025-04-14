const express = require('express');
const axios = require('axios');
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

router.get('/', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Query is required' });
  }

  if (!YOUTUBE_API_KEY) {
    console.error('YOUTUBE_API_KEY is not set');
    return res.status(500).json({ error: 'YouTube API key not configured' });
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        part: 'snippet',
        q: `${q} travel`,
        type: 'video',
        maxResults: 4,
        key: YOUTUBE_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('YouTube fetch error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

module.exports = router;