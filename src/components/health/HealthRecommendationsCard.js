import { Text, StyleSheet } from "react-native";
import AppCard from "../common/AppCard";
import theme from "../../constants/theme";
import mockHealthData from "../../data/mockHealthData";

export default function HealthRecommendationsCard() {
  return (
    <AppCard>
      <Text style={styles.title}>Recommendations</Text>

      {mockHealthData.advice.map((item, index) => (
        <Text key={index} style={styles.tip}>
          • {item}
        </Text>
      ))}
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
  tip: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
});
