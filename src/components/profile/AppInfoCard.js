import { Text, StyleSheet } from 'react-native';
import AppCard from '../common/AppCard';
import theme from '../../constants/theme';

export default function AppInfoCard() {
  return (
    <AppCard>
      <Text style={styles.title}>About EcoHealth</Text>

      <Text style={styles.text}>
        EcoHealth helps you understand how climate conditions impact your health
        and provides personalized insights to stay safe and healthy.
      </Text>

      <Text style={styles.version}>Version 1.0.0</Text>
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
  text: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  version: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
});
