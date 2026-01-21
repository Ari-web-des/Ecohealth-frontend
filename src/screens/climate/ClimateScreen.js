import { ScrollView, Text, StyleSheet } from "react-native";
import theme from "../../constants/theme";

import AQICard from "../../components/climate/AQICard";
import WeatherDetailsCard from "../../components/climate/WeatherDetailsCard";
import TemperatureChart from "../../components/climate/TemperatureChart";
import AQIChart from "../../components/climate/AQIChart";
import AQILegend from "../../components/climate/AQILegend";

export default function ClimateScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Climate</Text>
      <Text style={styles.subHeading}>Air quality & weather conditions</Text>

      <AQICard />
      <WeatherDetailsCard />
       <TemperatureChart />
      <AQIChart /> 
      <AQILegend />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: theme.spacing.md,
  },
  heading: {
    fontSize: theme.fonts.sizes.xl,
    fontWeight: "700",
    color: theme.colors.secondary,
  },
  subHeading: {
    marginBottom: theme.spacing.lg,
    color: theme.colors.textSecondary,
  },
});
