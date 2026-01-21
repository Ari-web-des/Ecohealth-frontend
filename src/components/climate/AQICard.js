import { View, Text, StyleSheet } from "react-native";
import AppCard from "../common/AppCard";
import StatusBadge from "../common/StatusBadge";
import theme from "../../constants/theme";
import useClimate from "../../hooks/useClimate";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import aqiScale from "../../constants/aqiScale";

export default function AQICard() {
  const { climate, loading } = useClimate();
  if (loading) return <Loader />;
  if (!climate) return null; // <EmptyState message="Climate data unavailable" />;
  const getAQIColor = (aqi) => {
    const level = aqiScale.find((item) => aqi >= item.min && aqi <= item.max);
    return level?.color || theme.colors.textPrimary;
  };
  const getAQIRecommendation = (aqi) => {
    if (aqi <= 50) return "Air quality is good. Enjoy outdoor activities.";
    if (aqi <= 100)
      return "Air quality is acceptable. Sensitive individuals should take care.";
    if (aqi <= 200) return "Limit prolonged outdoor exertion.";
    if (aqi <= 300) return "Avoid outdoor activities.";
    return "Serious health risk. Stay indoors.";
  };
  const getBadgeType = (aqi) => {
    if (aqi <= 50) return "success";
    if (aqi <= 100) return "info";
    if (aqi <= 200) return "warning";
    return "danger";
  };

  return (
    <AppCard>
      <Text style={styles.title}>Air Quality Index</Text>

      <Text style={[styles.aqiValue, { color: getAQIColor(climate.aqi) }]}>
        {climate.aqi}
      </Text>
      <StatusBadge label={climate.aqiStatus} type={getBadgeType(climate.aqi)} />

      <Text style={styles.description}>
        {getAQIRecommendation(climate.aqi)}
      </Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
    color: theme.colors.secondary,
  },
  aqiValue: {
    fontSize: 48,
    fontWeight: "700",
    color: theme.colors.warning,
  },
  description: {
    marginTop: theme.spacing.sm,
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textSecondary,
  },
});
