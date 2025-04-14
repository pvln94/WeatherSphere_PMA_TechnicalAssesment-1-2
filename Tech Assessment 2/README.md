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

# Demo and Screen shots
![image](https://github.com/user-attachments/assets/57b93f75-f3cd-4448-97a5-bd87b71a1b29)

![image](https://github.com/user-attachments/assets/66076a82-8441-4729-ab1d-9fe5a89ae0b4)

![image](https://github.com/user-attachments/assets/f02c0ba2-b80d-43c1-ae73-4fc89301e58e)

![image](https://github.com/user-attachments/assets/7e6f6b60-f121-4a4f-b952-0320ab7454d1)

![image](https://github.com/user-attachments/assets/88fa4f38-9fa3-467c-aa7f-ba59a4dd6479)

![image](https://github.com/user-attachments/assets/b8f55e00-af7f-4ba4-a132-cd681c5f7842)

![image](https://github.com/user-attachments/assets/fc36e96a-1ef3-4652-8ce2-413effe163de)

![image](https://github.com/user-attachments/assets/fcf9649d-411c-4ab7-8c5a-808aac2726ea)

## CRUD (Create, Read, Update, Delete) Operations

### Create
![image](https://github.com/user-attachments/assets/34672b68-027c-4aab-821c-d13239dfabb3)
![image](https://github.com/user-attachments/assets/3eccdd5b-b100-4179-b441-77992beb2173)

### Read
![image](https://github.com/user-attachments/assets/d1f83a28-c82b-47ec-b6f1-e14830c85607)

### Update
![image](https://github.com/user-attachments/assets/48cc577a-35be-47bd-b034-83747f947a08)
![image](https://github.com/user-attachments/assets/bac1970a-43f8-46af-a602-210733e2feb8)


### Delete
![image](https://github.com/user-attachments/assets/62a57a8f-613f-472f-b131-27a2f0b03897)
![image](https://github.com/user-attachments/assets/5618b423-8904-4fb7-bf75-81bf0d872aee)
![image](https://github.com/user-attachments/assets/83a16e61-ce9e-4bf4-a85a-9ee7db7c8840)


### Export data to csv format(JSON also available, we can also keep other types of export also)
![image](https://github.com/user-attachments/assets/501e9f4d-0c1c-49d4-b066-f8ddcf543a1f)
![image](https://github.com/user-attachments/assets/95cd0afa-b44d-4a6f-a23d-7a7c1ced9ba5)


## Demo Video link :[Here](https://drive.google.com/file/d/11p8ykxPUl6_sgAHPz2WhE5wPVDyKlf2c/view?usp=sharing) 

# License
This project is licensed under the MIT License. See the  file for details.

## Contact
Created by **Narasimha Pula**.  
For questions or feedback, feel free to contact me via [LinkedIn](https://www.linkedin.com/in/narasimhapula/) or via Mail (**narasimhapula2005@gmail.com**)
