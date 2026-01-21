import { View, Text, StyleSheet } from "react-native";
import AppCard from "../common/AppCard";
import theme from "../../constants/theme";
// import mockClimateData from '../../data/mockClimateData';
import useClimate from "../../hooks/useClimate";
import Loader from "../common/Loader";
// import EmptyState from "../common/EmptyState";

export default function WeatherDetailsCard() {
  const { climate, loading } = useClimate();
  if (loading) return <Loader />;
  if (!climate) return null;

  return (
    <AppCard>
      <Text style={styles.title}>Weather Details</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Temperature</Text>
        <Text style={styles.value}>{climate.temperature}°C</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Humidity</Text>
        <Text style={styles.value}>{climate.humidity}%</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Wind Speed</Text>
        <Text style={styles.value}>{climate.windSpeed} km/h</Text>
      </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.sm,
  },
  label: {
    color: theme.colors.textSecondary,
  },
  value: {
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
});
