import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../constants/theme';

export default function FullscreenLoader({ message = 'Loading climate and health data...' }) {
  return (
    <View style={styles.container}>
      <Ionicons name="reload-circle" size={56} color={theme.colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: theme.colors.surface,
  },
  message: {
    marginTop: 14,
    color: theme.colors.textSecondary,
    fontSize: theme.fonts.sizes.md,
  },
});
