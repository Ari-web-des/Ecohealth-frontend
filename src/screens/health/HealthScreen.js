import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../../constants/theme';

import HealthOverviewCard from '../../components/health/HealthOverviewCard';
import HealthMetricsCard from '../../components/health/HealthMetricsCard';
import HealthRecommendationsCard from '../../components/health/HealthRecommendationsCard';
import HealthInsights from '../../components/health/HealthInsights';
import useHealth from '../../hooks/useHealth';
import FullscreenLoader from '../../components/common/FullscreenLoader';

export default function HealthScreen() {
  const { health, loading } = useHealth();
  const insets = useSafeAreaInsets();

  if (loading) return <FullscreenLoader message="Loading health insights..." />;

  const DATA = [
    { id: 'header', type: 'header' },
    { id: 'overview', type: 'overview' },
    { id: 'metrics', type: 'metrics' },
    { id: 'recommendations', type: 'recommendations' },
    { id: 'insights', type: 'insights' },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>Health</Text>
            <Text style={styles.subHeading}>Your health insights based on climate</Text>
          </View>
        );
      case 'overview':
        return <HealthOverviewCard />;
      case 'metrics':
        return <HealthMetricsCard />;
      case 'recommendations':
        return <HealthRecommendationsCard />;
      case 'insights':
        return <HealthInsights />;
      default:
        return null;
    }
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top }]}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={true}
      removeClippedSubviews={false}
    />
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
