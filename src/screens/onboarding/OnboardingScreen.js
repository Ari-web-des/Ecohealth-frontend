import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../constants/theme';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoHealth</Text>
      <Text style={styles.subtitle}>
        Understand how climate affects your health
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Permissions')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  subtitle: {
    marginTop: 12,
    fontSize: theme.fonts.sizes.md,
    textAlign: 'center',
    color: theme.colors.textSecondary,
  },
  button: {
    marginTop: 40,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: theme.fonts.sizes.md,
    fontWeight: '600',
  },
});
