import { View, Text, StyleSheet } from 'react-native';
import AppCard from '../common/AppCard';
import theme from '../../constants/theme';

export default function PreferencesCard() {
  return (
    <AppCard>
      <Text style={styles.title}>Preferences</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Climate Alerts</Text>
        <Text style={styles.value}>Enabled</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Health Notifications</Text>
        <Text style={styles.value}>Enabled</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Units</Text>
        <Text style={styles.value}>Metric</Text>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
    color: theme.colors.textPrimary,
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
    color: theme.colors.primary,
  },
});
