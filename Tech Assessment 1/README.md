# WeatherSphere

WeatherSphere is a full-stack web application that delivers **real-time weather information**, **5-day forecasts**, and **location-based features** in an intuitive and engaging interface. Designed with a modern tech stack and a focus on user experience, it supports to give weather data based on City name, Zip/Postal code, Coordinates(Latitude, longitude) and also via current location.

## Features
- **Current Weather**: Fetch real-time weather data for any city, zip code, or coordinates.
- **5-Day Forecast**: View a 5-day weather forecast with temperature, conditions, and icons.
- **Geolocation Support**: Use your current location to retrieve weather data automatically.
- **Travel Tip**: Provides travel tip based on weather data.
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
- **Axios**: For making external API requests.

### APIs
- **OpenWeatherMap**: Provides current weather and forecast data.

## Installation

Follow these steps to set up WeatherSphere locally.

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Steps

1. **Clone the Repository**
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
# Environment Variables
Create `.env` files in both the **client** and **server** directories.

## server/.env
OPENWEATHER_API_KEY=your_openweather_api_key
PORT=5000

See the section below.
6. **Run the Backend**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on http://localhost:5000.
7. **Run the Frontend**
   ```bash
   cd client
   npm run dev
   ```
   The server will run on http://localhost:3000.

# Usage
-- Access the App: Open http://localhost:3000 in your browser.  
-- Search Weather: Enter a city name, zip code, or coordinates (e.g., 40.7128,-74.0060) in the input form, or click "Use Current Location".  
-- View Forecast: See the 5-day forecast below the current weather.  
-- Toggle Units: Switch between Celsius and Fahrenheit using the link in the weather display.  






# API Keys
You’ll need the following API keys:
-- OpenWeatherMap: Sign up at openweathermap.org to get a free API key.

# Demo and Screen shots
## City Name
![image](https://github.com/user-attachments/assets/ada59a01-444d-46d9-a0dd-0ce65c443aea)
![image](https://github.com/user-attachments/assets/497bd82c-b2fe-4b34-b8a1-247a87bb50f1)

## Coordinates(Latitude and Logitude)
![image](https://github.com/user-attachments/assets/1b839ac6-8bbc-41d6-9e03-f1caa8f5398a)
![image](https://github.com/user-attachments/assets/3c407dba-c62c-45cf-afaa-fb2fa9771722)

## Zip Code/ Postal Code
![image](https://github.com/user-attachments/assets/ccf23efc-239d-46d1-a48b-4b641932e96f)
![image](https://github.com/user-attachments/assets/22dbf2d5-a1ad-4b47-a7f6-5956b44e3ce4)

## Current Location
![image](https://github.com/user-attachments/assets/cdca518a-72e5-4cfa-892b-65cefbf20deb)
![image](https://github.com/user-attachments/assets/e0fa75a2-f23d-4319-8975-9758ecd0fffe)
![image](https://github.com/user-attachments/assets/18a65ca6-22c3-4fc3-8d3e-ee5d6b8ca4cf)

## API
![image](https://github.com/user-attachments/assets/ea9f56cc-4259-42ea-bfd7-9cb42a86133b)


## Demo Video link: [Here](https://drive.google.com/file/d/1XLpD2sQIE5wjfEYAnd_xPXzUUryb0H60/view) 

# License
This project is licensed under the MIT License. See the  file for details.

## Contact
Created by **Narasimha Pula**.  
For questions or feedback, feel free to contact me via [LinkedIn](https://www.linkedin.com/in/narasimhapula/) or via Mail (**narasimhapula2005@gmail.com**)

