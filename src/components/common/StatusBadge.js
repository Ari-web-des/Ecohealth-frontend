import { View, Text, StyleSheet } from 'react-native';
import theme from '../../constants/theme';

export default function StatusBadge({ label, type = 'info' }) {
  const backgroundMap = {
    success: '#DCFCE7',
    warning: '#FEF3C7',
    danger: '#FEE2E2',
    info: '#E0F2FE',
  };

  const textMap = {
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
    info: theme.colors.info,
  };

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: backgroundMap[type] },
      ]}
    >
      <Text style={[styles.text, { color: textMap[type] }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
