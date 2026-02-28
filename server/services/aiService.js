const axios = require("axios");

// Later this will call your friend's AI API
async function getAIInsights(climateData, historyLogs) {
  // TEMP RULE-BASED MOCK (until AI ready)

  const { temperature, aqi } = climateData;

  const riskScore = (temperature * 0.4 + aqi * 0.6) / 100;

  return {
    aiRiskScore: riskScore.toFixed(2),
    aiSummary:
      riskScore > 1
        ? "High environmental health risk detected"
        : "Environmental conditions are manageable",
    aiRecommendations:
      riskScore > 1
        ? ["Avoid outdoor activity", "Use mask"]
        : ["Stay hydrated", "Remain active"],
  };
}

module.exports = { getAIInsights };