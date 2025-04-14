# WeatherSphere

WeatherSphere is a full-stack web application that provides real-time weather information, 5-day forecasts, weather history management, location-based maps, and travel-related YouTube videos. Built with a modern tech stack, it offers an intuitive and responsive user interface for users to explore weather data seamlessly.

## Features
- **Current Weather**: Fetch real-time weather data for any city, zip code, or coordinates.
- **5-Day Forecast**: View a 5-day weather forecast with temperature, conditions, and icons.
- **Weather History**: Save, edit, and delete weather history for specific locations and date ranges, with export options (JSON/CSV).
- **Geolocation Support**: Use your current location to retrieve weather data automatically.
- **Interactive Map**: Display a Google Maps embed for the searched location.
- **Travel Videos**: Watch YouTube videos related to the searched location for travel inspiration.
- **Unit Conversion**: Toggle between Celsius and Fahrenheit for temperature display.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS for a great experience on all devices.
- **Dynamic Backgrounds**: Background changes based on weather conditions and time of day.

## Technologies

### Frontend
- **React**: JavaScript library for building the user interface.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for API requests.

### Backend
- **Node.js**: JavaScript runtime for server-side logic.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing weather history.
- **Mongoose**: ODM for MongoDB data modeling.
- **Axios**: For making external API requests.
- **csv-writer**: For exporting weather history as CSV.

### APIs
- **OpenWeatherMap**: Provides current weather and forecast data.
- **Google Maps Embed API**: Displays location maps.
- **YouTube Data API**: Fetches travel-related videos.

## Installation

Follow these steps to set up WeatherSphere locally.

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/weather-app-tech2.git
   cd weather-app-tech2
   ```
2.  **Backend Setup**
   ```bash
   cd server
   npm install
   ```
3. **Frontend Setup**
   ```bash
   cd client
   npm install
   ```
4. **Configure Environment Variables**
See the section below.
5. **Start MongoDB**
Ensure MongoDB is running locally (mongod) or use a MongoDB Atlas connection string.
6. **Run the Backend**
   ```bash
   cd server
   npm start
   ```
   The server will run on http://localhost:5000.
7. **Run the Frontend**
   ```bash
   cd client
   npm run dev
   ```
   The server will run on http://localhost:5173.

# Usage
-- Access the App: Open http://localhost:5173 in your browser.  
-- Search Weather: Enter a city name, zip code, or coordinates (e.g., 40.7128,-74.0060) in the input form, or click "Use Current Location".  
-- View Forecast: See the 5-day forecast below the current weather.  
-- Manage History: Add weather history by specifying a location and date range. Edit or delete existing records, and export them as JSON or CSV.  
-- Explore Map: View a map of the searched location (requires Google Maps API key).  
-- Watch Videos: Check out travel-related YouTube videos for the location (requires YouTube API key).  
-- Toggle Units: Switch between Celsius and Fahrenheit using the link in the weather display.  


# Environment Variables
Create `.env` files in both the **client** and **server** directories.
## client/.env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
## server/.env
OPENWEATHER_API_KEY=your_openweather_api_key
YOUTUBE_API_KEY=your_youtube_api_key
MONGO_URI=mongodb://localhost:27017/weatherDB
PORT=5000



# API Keys
You’ll need the following API keys:
-- OpenWeatherMap: Sign up at openweathermap.org to get a free API key.
-- Google Maps: Get an Embed API key from Google Cloud Console.
-- YouTube Data API: Enable the YouTube Data API v3 in Google Cloud Console and generate a key.


# License
This project is licensed under the MIT License. See the  file for details.

## Contact
Created by **Narasimha Pula**.  
For questions or feedback, feel free to contact me via [LinkedIn](https://www.linkedin.com/in/narasimhapula/) or via Mail (**narasimhapula2005@gmail.com**)
