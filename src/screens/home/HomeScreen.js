import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../constants/theme";


import ClimateSummaryCard from "../../components/climate/ClimateSummaryCard";
import HealthSummaryCard from "../../components/health/HealthSummaryCard";
import HealthOverviewCard from "../../components/health/HealthOverviewCard";
import HealthMetricsCard from "../../components/health/HealthMetricsCard";
import HealthRecommendationsCard from "../../components/health/HealthRecommendationsCard";
import { useClimateContext } from "../../context/ClimateContext";
import useHealth from "../../hooks/useHealth";
import FullscreenLoader from "../../components/common/FullscreenLoader";
import ActivityPlanner from "../../components/health/ActivityPlanner";
import useLocation from "../../hooks/useLocation";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import HealthSafetySection from "../../components/health/HealthSafetySection";

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const { climate, loading: climateLoading } = useClimateContext();
  const { health, loading: healthLoading } = useHealth();
  const { coords } = useLocation();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  if (climateLoading && healthLoading) {
    return <FullscreenLoader />;
  }

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>EcoHealth</Text>
        <Text style={styles.subHeading}>Climate & Health Overview</Text>

        <ClimateSummaryCard climate={climate} />

        <ActivityPlanner climate={climate} loading={climateLoading} />

        <HealthOverviewCard />
        <HealthMetricsCard />
        <HealthRecommendationsCard />
        <HealthSummaryCard />
        <HealthSafetySection />
      </ScrollView>
    </Animated.View>
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
    color: theme.colors.primary,
  },
  subHeading: {
    marginTop: 4,
    marginBottom: theme.spacing.lg,
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.textSecondary,
  },
});
