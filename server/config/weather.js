require("dotenv").config();

module.exports = {
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
  WEATHER_BASE_URL: "https://api.openweathermap.org/data/2.5"
};