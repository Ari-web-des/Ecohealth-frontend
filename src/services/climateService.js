import { OPEN_WEATHER_API_KEY, WEATHER_BASE_URL } from '../config/apiConfig';

// Get current weather
export const getCurrentClimate = async (lat, lon) => {
  const response = await fetch(
    `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  );

  const data = await response.json();

  return {
    temperature: Math.round(data.main.temp),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
  };
};

// Get AQI
export const getAirQuality = async (lat, lon) => {
  const response = await fetch(
    `${WEATHER_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`
  );

  const data = await response.json();
  const aqi = data.list[0].main.aqi;

  // Convert OpenWeather AQI (1–5) → Standard AQI scale
  const aqiMap = {
    1: { value: 50, status: 'Good' },
    2: { value: 100, status: 'Satisfactory' },
    3: { value: 200, status: 'Moderate' },
    4: { value: 300, status: 'Poor' },
    5: { value: 400, status: 'Very Poor' },
  };

  return {
    aqi: aqiMap[aqi].value,
    aqiStatus: aqiMap[aqi].status,
  };
};
