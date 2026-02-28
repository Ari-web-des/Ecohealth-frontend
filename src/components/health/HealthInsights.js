import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AppCard from "../common/AppCard";
import theme from "../../constants/theme";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function HealthInsights({ health }) {
  if (!health) return null;

  // ---------------------------
  // Dynamic Stats Calculation
  // ---------------------------

  const stats = {
    hydrationCompliance: health.hydration,
    currentStreak:
      health.riskLevel === "Low"
        ? 7
        : health.riskLevel === "Moderate"
        ? 4
        : 2,
    safeDaysThisWeek:
      health.riskLevel === "Low"
        ? 6
        : health.riskLevel === "Moderate"
        ? 4
        : 2,
    achievementsUnlocked:
      health.hydration > 80
        ? 4
        : health.hydration > 60
        ? 3
        : 2,
  };

  // ---------------------------
  // Weekly Compliance Logic
  // ---------------------------

  const weeklyData = DAYS.map((day, index) => {
    const compliant =
      health.riskLevel === "Low"
        ? true
        : health.riskLevel === "Moderate"
        ? index < 5
        : index < 3;

    return { day, compliant };
  });

  // ---------------------------
  // Dynamic Impact
  // ---------------------------

  const impactReduction =
    health.riskLevel === "Low"
      ? 85
      : health.riskLevel === "Moderate"
      ? 65
      : 40;

  const extremeDaysAvoided =
    health.riskLevel === "Low" ? 15 : health.riskLevel === "Moderate" ? 8 : 3;

  const extraWater =
    health.hydration > 80 ? "~3L" : health.hydration > 60 ? "~2.5L" : "~1.5L";

  // ---------------------------
  // Dynamic Achievements
  // ---------------------------

  const achievements = [
    {
      id: 1,
      name: "Hydration Hero",
      description: "Maintained healthy hydration levels",
      unlocked: health.hydration > 70,
      icon: "💧",
    },
    {
      id: 2,
      name: "Air Aware",
      description: "Avoided outdoor activity during poor AQI",
      unlocked: health.aqi < 150,
      icon: "🌫️",
    },
    {
      id: 3,
      name: "Heat Smart",
      description: "Managed heat exposure effectively",
      unlocked: health.temperature < 38,
      icon: "🌡️",
    },
  ];

  const renderStatCard = (title, value, color) => (
    <AppCard style={[styles.statCard, { backgroundColor: color || "#fff" }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{title}</Text>
    </AppCard>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Health Insights</Text>
      <Text style={styles.subHeading}>
        Insights derived from real climate conditions
      </Text>

      {/* Stats */}
      <View style={styles.grid}>
        {renderStatCard("Day Streak", stats.currentStreak, "#EEF7F0")}
        {renderStatCard(
          "Safe Days This Week",
          `${stats.safeDaysThisWeek}/7`,
          "#F0F9FF"
        )}
        {renderStatCard(
          "Hydration",
          `${stats.hydrationCompliance}%`,
          "#F8F0FF"
        )}
        {renderStatCard(
          "Achievements",
          stats.achievementsUnlocked,
          "#FFF7ED"
        )}
      </View>

      {/* Impact */}
      <AppCard>
        <Text style={styles.cardTitle}>Your Health Impact</Text>
        <Text style={styles.cardDesc}>
          Calculated from current environmental risk
        </Text>

        <View style={styles.impactRow}>
          <View style={styles.impactBox}>
            <Text style={styles.impactValue}>
              {extremeDaysAvoided}
            </Text>
            <Text style={styles.impactLabel}>
              Extreme risk days avoided
            </Text>
          </View>

          <View style={styles.impactBox}>
            <Text style={styles.impactValue}>{extraWater}</Text>
            <Text style={styles.impactLabel}>
              Extra water consumed
            </Text>
          </View>

          <View style={styles.impactBox}>
            <Text style={styles.impactValue}>
              {impactReduction}%
            </Text>
            <Text style={styles.impactLabel}>
              Risk reduction
            </Text>
          </View>
        </View>
      </AppCard>

      {/* Weekly Compliance */}
      <AppCard>
        <Text style={styles.cardTitle}>Weekly Compliance</Text>

        <View style={styles.weekRow}>
          {weeklyData.map((d, i) => (
            <View key={i} style={styles.weekDay}>
              <View
                style={[
                  styles.weekBox,
                  d.compliant
                    ? styles.safeBox
                    : styles.unsafeBox,
                ]}
              >
                <Text style={styles.weekMark}>
                  {d.compliant ? "✓" : "✗"}
                </Text>
              </View>
              <Text style={styles.weekLabel}>{d.day}</Text>
            </View>
          ))}
        </View>
      </AppCard>

      {/* Achievements */}
      <AppCard>
        <Text style={styles.cardTitle}>Achievements</Text>

        <FlatList
          data={achievements}
          keyExtractor={(i) => String(i.id)}
          renderItem={({ item }) => (
            <View
              style={[
                styles.achievementRow,
                !item.unlocked && styles.locked,
              ]}
            >
              <Text style={styles.achievementIcon}>
                {item.icon}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.achievementName}>
                  {item.name}
                </Text>
                <Text style={styles.achievementDesc}>
                  {item.description}
                </Text>
              </View>
            </View>
          )}
        />
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
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  statCard: { flex: 1, marginRight: 8, paddingVertical: 12 },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  statLabel: {
    color: theme.colors.textSecondary,
    marginTop: 6,
  },
  cardTitle: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: "600",
    marginBottom: 6,
  },
  cardDesc: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  impactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  impactBox: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  impactValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  impactLabel: {
    marginTop: 6,
    color: theme.colors.textSecondary,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm,
  },
  weekDay: { alignItems: "center", flex: 1 },
  weekBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  safeBox: { backgroundColor: "#10B981" },
  unsafeBox: { backgroundColor: "#FCA5A5" },
  weekMark: { color: "#fff", fontWeight: "700" },
  weekLabel: {
    marginTop: 6,
    color: theme.colors.textSecondary,
  },
  achievementRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  achievementIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  achievementName: {
    fontWeight: "600",
  },
  achievementDesc: {
    color: theme.colors.textSecondary,
    fontSize: theme.fonts.sizes.sm,
  },
  locked: {
    opacity: 0.4,
  },
});