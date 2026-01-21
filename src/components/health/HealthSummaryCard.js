import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppCard from '../common/AppCard';
import StatusBadge from '../common/StatusBadge';
import theme from '../../constants/theme';

export default function HealthSummaryCard() {
  return (
    <AppCard>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="heart-outline" size={20} color={theme.colors.danger} />
          <Text style={styles.title}>Health Advisory</Text>
        </View>
        <StatusBadge label="Low Risk" type="success" />
      </View>

      <Text style={styles.tip}>
        Outdoor exercise is safe. Stay hydrated and avoid peak heat hours.
      </Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 6,
    fontSize: theme.fonts.sizes.lg,
    fontWeight: '600',
    color: theme.colors.danger,
  },
  tip: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textSecondary,
    fontSize: theme.fonts.sizes.sm,
  },
});
