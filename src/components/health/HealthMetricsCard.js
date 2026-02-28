import { View, Text, StyleSheet } from "react-native";
import AppCard from "../common/AppCard";
import theme from "../../constants/theme";
// import mockHealthData from '../../data/mockHealthData';
// import useHealth from "../../hooks/useHealth";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

export default function HealthMetricsCard({ health}) {
  if (!health) return null;

  // if (loading) return <Loader />;
  // if (!health) return <EmptyState message="Health metrics unavailable" />;

  return (
    <AppCard>
      <Text style={styles.title}>Health Metrics</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Heat Stress</Text>
        <Text style={styles.value}>{health.heatStress}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Respiratory Risk</Text>
        <Text style={styles.value}>{health.respiratoryRisk}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Hydration Level</Text>
        <Text style={styles.value}>{health.hydration}</Text>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: "600",
    marginBottom: theme.spacing.sm,
    color: theme.colors.danger,
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
