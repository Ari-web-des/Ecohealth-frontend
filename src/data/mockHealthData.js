const mockHealthData = {
  temperature: 34,
  aqi: 120,

  riskLevel: 'Moderate',
  heatStress: 'Medium',
  respiratoryRisk: 'Moderate',
  hydration: 78, // percentage

  currentStreak: 5,
  safeDaysThisWeek: 4,
  achievementsUnlocked: 3,

  advice: [
    'Drink plenty of water',
    'Avoid outdoor activity at noon',
    'Wear a mask if air quality worsens',
  ],
};

export default mockHealthData;