import { View, Text, StyleSheet } from 'react-native';
import AppCard from '../common/AppCard';
import aqiScale from '../../constants/aqiScale';
import theme from '../../constants/theme';

export default function AQILegend() {
  return (
    <AppCard>
      <Text style={styles.title}>AQI Levels</Text>

      {aqiScale.map((item, index) => (
        <View key={index} style={styles.row}>
          <View
            style={[
              styles.colorDot,
              { backgroundColor: item.color },
            ]}
          />
          <Text style={styles.label}>
            {item.label} ({item.min}–{item.max})
          </Text>
        </View>
      ))}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
    color: theme.colors.secondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: theme.spacing.sm,
  },
  label: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textSecondary,
  },
});
