import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import AppCard from '../common/AppCard';
import theme from '../../constants/theme';

export default function PreferencesCard({ preferences = {}, onChange = () => {} }) {
  const { hydrationAlerts = true, heatAlerts = true, aqiAlerts = true } = preferences;

  return (
    <AppCard>
      <Text style={styles.title}>Preferences</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Hydration Alerts</Text>
        <Switch
          value={hydrationAlerts}
          onValueChange={(v) => onChange({ ...preferences, hydrationAlerts: v })}
          thumbColor={theme.colors.primary}
          accessibilityLabel="Toggle hydration alerts"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Heat Alerts</Text>
        <Switch
          value={heatAlerts}
          onValueChange={(v) => onChange({ ...preferences, heatAlerts: v })}
          thumbColor={theme.colors.primary}
          accessibilityLabel="Toggle heat alerts"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>AQI Alerts</Text>
        <Switch
          value={aqiAlerts}
          onValueChange={(v) => onChange({ ...preferences, aqiAlerts: v })}
          thumbColor={theme.colors.primary}
          accessibilityLabel="Toggle AQI alerts"
        />
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
