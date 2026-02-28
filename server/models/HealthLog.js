const mongoose = require("mongoose");

const HealthLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  temperature: Number,
  aqi: Number,
  heatStress: String,
  respiratoryRisk: String,
  hydration: Number,
  riskLevel: String,
});

module.exports = mongoose.model("HealthLog", HealthLogSchema);