// healthService.js

import { getCurrentClimate, getAirQuality } from "./climateService";
// ⚠️ Replace with your actual weather & AQI service imports

// -------------------------
// Calculation Functions
// -------------------------

const calculateHeatStress = (temp) => {
  if (temp >= 40) return "High";
  if (temp >= 35) return "Moderate";
  return "Low";
};

const calculateRespiratoryRisk = (aqi) => {
  if (aqi >= 300) return "Severe";
  if (aqi >= 150) return "High";
  if (aqi >= 100) return "Moderate";
  return "Low";
};

const calculateHydrationScore = (temp) => {
  if (temp >= 40) return 50;
  if (temp >= 35) return 65;
  if (temp >= 30) return 75;
  return 90;
};

const calculateOverallRisk = (heat, respiratory) => {
  if (heat === "High" || respiratory === "Severe") return "High";
  if (
    heat === "Moderate" ||
    respiratory === "Moderate" ||
    respiratory === "High"
  )
    return "Moderate";
  return "Low";
};

const generateAdvice = (temp, aqi) => {
  const advice = [];

  if (temp >= 35) {
    advice.push("Avoid outdoor activities during peak heat hours");
    advice.push("Drink plenty of water");
  }

  if (aqi >= 100) {
    advice.push("Wear a mask outdoors");
    advice.push("Limit prolonged outdoor exposure");
  }

  if (advice.length === 0) {
    advice.push("Weather conditions are safe today. Stay active!");
  }

  return advice;
};

// -------------------------
// Main Health Engine
// -------------------------

export const getHealthData = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/health/today");

    if (!response.ok) {
      throw new Error("Failed to fetch health data");
    }

    return await response.json();
  } catch (error) {
    console.error("Frontend health fetch error:", error);
    return null;
  }
};
