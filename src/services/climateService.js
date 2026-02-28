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

// Get climate trends (fallback to mock data)
export const getClimateTrends = async (lat, lon) => {
  try {
    const [weatherRes, aqiRes] = await Promise.all([
      fetch(
        `${WEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
      ),
      fetch(
        `${WEATHER_BASE_URL}/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`
      ),
    ]);

    const weatherData = await weatherRes.json();
    const aqiData = await aqiRes.json();

    const groupedTemp = {};
    const groupedAQI = {};

    // 🔹 Group temperature (take max temp per day)
    weatherData.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      const temp = Math.round(item.main.temp);

      if (!groupedTemp[date] || temp > groupedTemp[date]) {
        groupedTemp[date] = temp;
      }
    });

    // 🔹 AQI conversion same as current AQI mapping
    const aqiMap = {
      1: 50,
      2: 100,
      3: 200,
      4: 300,
      5: 400,
    };

    // 🔹 Group AQI (take max AQI per day)
    aqiData.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      const aqiValue = aqiMap[item.main.aqi];

      if (!groupedAQI[date] || aqiValue > groupedAQI[date]) {
        groupedAQI[date] = aqiValue;
      }
    });

    const dates = Object.keys(groupedTemp).slice(0, 5); // 5-day forecast

    return {
      labels: dates.map((date) =>
        new Date(date).toLocaleDateString("en-US", { weekday: "short" })
      ),
      temperature: dates.map((date) => groupedTemp[date]),
      aqi: dates.map((date) => groupedAQI[date] || 0),
    };
  } catch (error) {
    console.log("Trend API Error:", error);
    return null;
  }
};
