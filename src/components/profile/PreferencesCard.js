import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import AppCard from "../common/AppCard";
import theme from "../../constants/theme";

export default function PreferencesCard({
  preferences = {},
  onChange = () => {},
}) {
  const {
    hydrationAlerts = true,
    heatAlerts = true,
    aqiAlerts = true,

    morningBriefing = true,
    extremeWeatherAlerts = true,
    governmentAlerts = true,
  } = preferences;

  const updatePref = (key, value) => {
    onChange({ ...preferences, [key]: value });
  };

  return (
    <>
      {/* ======== CARD 1 — Core Health Preferences ======== */}
      <AppCard style={styles.card}>
        <Text style={styles.title}>Health Alert Preferences</Text>

        <PreferenceRow
          label="Hydration Alerts"
          value={hydrationAlerts}
          onToggle={(v) => updatePref("hydrationAlerts", v)}
        />

        <PreferenceRow
          label="Heat Alerts"
          value={heatAlerts}
          onToggle={(v) => updatePref("heatAlerts", v)}
        />

        <PreferenceRow
          label="AQI Alerts"
          value={aqiAlerts}
          onToggle={(v) => updatePref("aqiAlerts", v)}
        />
      </AppCard>

      {/* ======== CARD 2 — Government & Scheduled Alerts ======== */}
      <AppCard style={styles.card}>
        <Text style={styles.title}>Government & Scheduled Alerts</Text>

        <PreferenceRow
          label="Morning health briefing (8:00 AM)"
          value={morningBriefing}
          onToggle={(v) => updatePref("morningBriefing", v)}
        />

        <PreferenceRow
          label="Extreme weather/air quality alerts"
          value={extremeWeatherAlerts}
          onToggle={(v) => updatePref("extremeWeatherAlerts", v)}
        />

        <PreferenceRow
          label="Government disaster alerts (IMD, NDMA, CPCB)"
          value={governmentAlerts}
          onToggle={(v) => updatePref("governmentAlerts", v)}
        />
      </AppCard>
    </>
  );
}

const PreferenceRow = ({ label, value, onToggle }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: "#ccc", true: theme.colors.primary }}
      thumbColor="#fff"
    />
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
    color: theme.colors.textPrimary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  label: {
    flex: 1,
    color: theme.colors.textSecondary,
  },
});