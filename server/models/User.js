const mongoose = require('mongoose');

const PreferencesSchema = new mongoose.Schema({
  hydrationAlerts: { type: Boolean, default: true },
  heatAlerts: { type: Boolean, default: true },
  aqiAlerts: { type: Boolean, default: true },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  preferences: { type: PreferencesSchema, default: () => ({}) },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
