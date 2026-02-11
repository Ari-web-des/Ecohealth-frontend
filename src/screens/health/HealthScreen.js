import { ScrollView, View, Text, StyleSheet } from 'react-native';
import theme from '../../constants/theme';

import HealthOverviewCard from '../../components/health/HealthOverviewCard';
import HealthMetricsCard from '../../components/health/HealthMetricsCard';
import HealthRecommendationsCard from '../../components/health/HealthRecommendationsCard';
import HealthInsights from '../../components/health/HealthInsights';
import useHealth from '../../hooks/useHealth';
import FullscreenLoader from '../../components/common/FullscreenLoader';

export default function HealthScreen() {
  const { health, loading } = useHealth();

  if (loading) return <FullscreenLoader message="Loading health insights..." />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Health</Text>
        <Text style={styles.subHeading}>Your health insights based on climate</Text>
      </View>

      <HealthOverviewCard />
      <HealthMetricsCard />
      <HealthRecommendationsCard />

      <HealthInsights />
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
    fontSize: theme.fonts.sizes.xxl,
    fontWeight: '700',
    color: theme.colors.danger,
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
