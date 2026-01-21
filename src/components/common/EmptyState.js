import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../constants/theme';

export default function EmptyState({ message }) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="alert-circle-outline"
        size={40}
        color={theme.colors.textMuted}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: theme.spacing.sm,
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});
