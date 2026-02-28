import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../constants/theme";

import AQICard from "../../components/climate/AQICard";
import WeatherDetailsCard from "../../components/climate/WeatherDetailsCard";
import TemperatureChart from "../../components/climate/TemperatureChart";
import AQIChart from "../../components/climate/AQIChart";
import AQILegend from "../../components/climate/AQILegend";
import useClimate from "../../hooks/useClimate";
import FullscreenLoader from "../../components/common/FullscreenLoader";

export default function ClimateScreen() {
  const { climate, loading } = useClimate();
  const insets = useSafeAreaInsets();

  if (loading) return <FullscreenLoader message="Loading climate data..." />;
  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top }]}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Climate</Text>
        <Text style={styles.subHeading}>Air quality & weather conditions</Text>
      </View>

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
    paddingBottom: 120,
  },
  heading: {
    fontSize: theme.fonts.sizes.xxl,
    fontWeight: "700",
    color: theme.colors.secondary,
  },
  subHeading: {
    marginTop: 6,
    marginBottom: theme.spacing.lg,
    color: theme.colors.textSecondary,
  },
  headerContainer: {
    paddingBottom: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
});
