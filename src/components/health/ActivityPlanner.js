import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";

import AppCard from "../common/AppCard";
import theme from "../../constants/theme";

export default function ActivityPlanner({ climate, loading }) {
  const [safeHours, setSafeHours] = useState([]);

  useEffect(() => {
    if (!climate) return;

    const hours = [];
    const now = new Date();

    const baseTemp = climate.temp ?? 30;
    const baseAQI = climate.aqi ?? 100;
    const uv = climate.uvIndex ?? 5;

    for (let i = 0; i < 24; i++) {
      const hour = new Date(now);
      hour.setHours(i, 0, 0, 0);

      // small realistic variations
      const temp = baseTemp + Math.sin(((i - 6) * Math.PI) / 12) * 4;
      const feelsLike = temp + (uv > 7 && i >= 10 && i <= 16 ? 4 : 0);
      const aqi = baseAQI + Math.sin(((i - 8) * Math.PI) / 10) * 20;

      let safety = "safe";
      if (feelsLike > 38 || aqi > 200) safety = "unsafe";
      else if (feelsLike > 35 || aqi > 150) safety = "caution";
      else if (feelsLike > 30 || aqi > 100) safety = "moderate";

      hours.push({
        hour: i,
        temp: Math.round(temp),
        feelsLike: Math.round(feelsLike),
        aqi: Math.round(aqi),
        uvIndex: Math.round(uv),
        safety,
      });
    }

    setSafeHours(hours);
  }, [climate]);

  const getSafetyColor = (s) => {
    switch (s) {
      case "safe":
        return "#10B981";
      case "moderate":
        return "#F59E0B";
      case "caution":
        return "#FB923C";
      case "unsafe":
        return "#EF4444";
      default:
        return "#9CA3AF";
    }
  };

  if (loading) {
    return (
      <Text style={{ color: theme.colors.textSecondary }}>
        Loading activity planner…
      </Text>
    );
  }

  const currentHour = new Date().getHours();
  const current = safeHours.find((h) => h.hour === currentHour);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Outdoor Activity Planner</Text>
      <Text style={styles.subHeading}>Based on real-time heat & AQI</Text>

      {current && (
        <AppCard style={{ backgroundColor: "#F0F9FF" }}>
          <Text style={styles.cardTitle}>Current Conditions</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.small}>Temp</Text>
              <Text style={styles.big}>{current.temp}°C</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.small}>Feels</Text>
              <Text style={styles.big}>{current.feelsLike}°C</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.small}>AQI</Text>
              <Text style={styles.big}>{current.aqi}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.small}>UV</Text>
              <Text style={styles.big}>{current.uvIndex}</Text>
            </View>
          </View>

          <View
            style={[
              styles.safetyBadge,
              { backgroundColor: getSafetyColor(current.safety) },
            ]}
          >
            <Text style={styles.safetyText}>
              {current.safety.toUpperCase()}
            </Text>
          </View>
        </AppCard>
      )}

      <AppCard>
        <Text style={styles.cardTitle}>24-Hour Timeline</Text>

        {Platform.OS === "web" ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ height: 96 }} // ✅ REQUIRED ON WEB
            contentContainerStyle={{
              paddingLeft: 4,
              paddingRight: 16,
              alignItems: "center",
            }}
            onWheel={(e) => {
              // ✅ map vertical wheel → horizontal scroll
              e.currentTarget.scrollLeft += e.deltaY;
            }}
          >
            {safeHours.map((item) => (
              <View
                key={item.hour}
                style={[
                  styles.hourBox,
                  { backgroundColor: getSafetyColor(item.safety) },
                ]}
              >
                <Text style={styles.hourLabel}>{item.hour}:00</Text>
                <Text style={styles.hourSmall}>{item.temp}°</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <FlatList
            data={safeHours}
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(i) => String(i.hour)}
            style={{ height: 96 }}
            contentContainerStyle={{
              paddingLeft: 4,
              paddingRight: 16,
            }}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.hourBox,
                  { backgroundColor: getSafetyColor(item.safety) },
                ]}
              >
                <Text style={styles.hourLabel}>{item.hour}:00</Text>
                <Text style={styles.hourSmall}>{item.temp}°</Text>
              </View>
            )}
          />
        )}
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 24 },
  heading: {
    fontSize: theme.fonts.sizes.xl,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  subHeading: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
    color: theme.colors.textPrimary,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  col: { flex: 1, alignItems: "center" },
  small: { color: theme.colors.textSecondary },
  big: { fontSize: 18, fontWeight: "700", color: theme.colors.textPrimary },
  safetyBadge: {
    marginTop: theme.spacing.sm,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  safetyText: { color: "#fff", fontWeight: "700" },
  hourBox: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  hourLabel: { color: "#fff", fontWeight: "700" },
  hourSmall: { color: "#fff" },
  windowsRow: { flexDirection: "row", justifyContent: "space-between" },
  windowBox: { flex: 1, padding: 12, borderRadius: 8, marginRight: 8 },
  windowLabel: { fontWeight: "700" },
  windowTime: { color: theme.colors.textSecondary },
});
