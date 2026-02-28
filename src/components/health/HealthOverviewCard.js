import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppCard from "../common/AppCard";
import StatusBadge from "../common/StatusBadge";
import theme from "../../constants/theme";
// import useHealth from "../../hooks/useHealth";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

export default function HealthOverviewCard({ health }) {
  if (!health) return null;
  // const { health, loading } = useHealth();

  // if (loading) return <Loader />;
  // if (!health) return <EmptyState message="Health data unavailable" />;

  return (
    <AppCard>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons
            name="pulse-outline"
            size={20}
            color={theme.colors.danger}
          />
          <Text style={styles.title}>Overall Health Risk</Text>
        </View>

        <StatusBadge
          label={`${health.riskLevel} Risk`}
          type={health.riskLevel === "Low" ? "success" : "warning"}
        />
      </View>

      <Text style={styles.description}>
        Current climate conditions indicate {health.riskLevel.toLowerCase()}{" "}
        health risk for most individuals.
      </Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 6,
    fontSize: theme.fonts.sizes.lg,
    fontWeight: "600",
    color: theme.colors.danger,
  },
  description: {
    marginTop: theme.spacing.sm,
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textSecondary,
  },
});
