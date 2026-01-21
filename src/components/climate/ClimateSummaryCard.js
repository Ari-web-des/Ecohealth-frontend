import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppCard from '../common/AppCard';
import StatusBadge from '../common/StatusBadge';
import theme from '../../constants/theme';

export default function ClimateSummaryCard() {
  return (
    <AppCard>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="earth-outline" size={20} color={theme.colors.secondary} />
          <Text style={styles.title}>Climate Status</Text>
        </View>
        <StatusBadge label="Moderate AQI" type="warning" />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Temperature</Text>
        <Text style={styles.value}>32°C</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Humidity</Text>
        <Text style={styles.value}>68%</Text>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 6,
    fontSize: theme.fonts.sizes.lg,
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
  },
  label: {
    color: theme.colors.textSecondary,
  },
  value: {
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
});
