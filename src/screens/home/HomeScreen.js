import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import theme from "../../constants/theme";

import ClimateSummaryCard from "../../components/climate/ClimateSummaryCard";
import HealthSummaryCard from "../../components/health/HealthSummaryCard";

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.heading}>EcoHealth</Text>
        <Text style={styles.subHeading}>Climate & Health Overview</Text>

        <ClimateSummaryCard />
        <HealthSummaryCard />
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
