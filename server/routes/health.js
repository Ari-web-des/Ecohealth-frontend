const express = require("express");
const router = express.Router();
const HealthLog = require("../models/HealthLog");

// Example: middleware for auth
// const auth = require("../middleware/auth");

const axios = require("axios");

// Replace with your existing weather service logic
const { OPEN_WEATHER_API_KEY, WEATHER_BASE_URL } = require("../config/weather");

async function calculateHealthFromAPI(lat, lon) {
  // Example coordinates (Bengaluru for now)
  lat = lat || 12.9716;
  lon = lon || 77.5946;

  const weatherResponse = await axios.get(
    `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`,
  );

  const airResponse = await axios.get(
    `${WEATHER_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`,
  );

  const temperature = weatherResponse.data.main.temp;
  const aqiIndex = airResponse.data.list[0].main.aqi;

  const aqi = aqiIndex * 50; // convert 1–5 → scale

  const heatStress =
    temperature >= 40 ? "High" : temperature >= 35 ? "Moderate" : "Low";

  const respiratoryRisk =
    aqi >= 300
      ? "Severe"
      : aqi >= 150
        ? "High"
        : aqi >= 100
          ? "Moderate"
          : "Low";

  const hydration =
    temperature >= 40
      ? 50
      : temperature >= 35
        ? 65
        : temperature >= 30
          ? 75
          : 90;

  const riskLevel =
    heatStress === "High" ||
    respiratoryRisk === "Severe" ||
    respiratoryRisk === "High"
      ? "High"
      : heatStress === "Moderate" || respiratoryRisk === "Moderate"
        ? "Moderate"
        : "Low";

  return {
    temperature,
    aqi,
    heatStress,
    respiratoryRisk,
    hydration,
    riskLevel,
  };
}

function calculateStreak(logs) {
  let streak = 0;

  for (let log of logs) {
    if (log.riskLevel === "Low") streak++;
    else break;
  }

  return streak;
}

function calculateAchievements(logs) {
  const hydrationStreak = logs.filter((l) => l.hydration > 70).length;
  const lowAqiDays = logs.filter((l) => l.aqi < 150).length;
  const lowHeatDays = logs.filter((l) => l.temperature < 38).length;

  return {
    hydrationHero: hydrationStreak >= 5,
    airAware: lowAqiDays >= 5,
    heatSmart: lowHeatDays >= 3,
  };
}

router.get("/today", async (req, res) => {
  try {
    const userId = "67a123456789abcdef123456"; // from auth middleware

    const today = new Date().toISOString().split("T")[0];

    // 1. Fetch climate data (you can reuse your service)
    const healthData = await calculateHealthFromAPI();

    // 2. Check if today already exists
    let log = await HealthLog.findOne({ userId, date: today });

    if (!log) {
      log = await HealthLog.create({
        userId,
        date: today,
        ...healthData,
      });
    }

    // 3. Calculate streak
    const logs = await HealthLog.find({ userId }).sort({ date: -1 }).limit(7);

    const currentStreak = calculateStreak(logs);

    // 4. Achievements logic
    const achievements = calculateAchievements(logs);

    res.json({
      ...healthData,
      currentStreak,
      safeDaysThisWeek: logs.filter((l) => l.riskLevel === "Low").length,
      achievements,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Health engine failed" });
  }
});

module.exports = router;
