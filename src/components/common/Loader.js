import { View, ActivityIndicator, StyleSheet } from 'react-native';
import theme from '../../constants/theme';

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
