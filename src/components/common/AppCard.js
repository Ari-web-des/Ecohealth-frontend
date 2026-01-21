import { Pressable, StyleSheet } from 'react-native';
import theme from '../../constants/theme';
import globalStyles from '../../styles/globalStyles';

export default function AppCard({ children, style, onPress }) {
  const isPressable = typeof onPress === 'function';

  return (
    <Pressable
      disabled={!isPressable}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        globalStyles.cardShadow,
        pressed && isPressable && { transform: [{ scale: 0.98 }] },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
});
