import { ScrollView, Text, StyleSheet } from 'react-native';
import theme from '../../constants/theme';

import HealthOverviewCard from '../../components/health/HealthOverviewCard';
import HealthMetricsCard from '../../components/health/HealthMetricsCard';
import HealthRecommendationsCard from '../../components/health/HealthRecommendationsCard';

export default function HealthScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Health</Text>
      <Text style={styles.subHeading}>Your health insights based on climate</Text>

      <HealthOverviewCard />
      <HealthMetricsCard />
      <HealthRecommendationsCard />
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
    fontWeight: '700',
    color: theme.colors.danger,
  },
  subHeading: {
    marginBottom: theme.spacing.lg,
    color: theme.colors.textSecondary,
  },
});
