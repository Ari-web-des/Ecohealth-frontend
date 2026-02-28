import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import theme from '../../constants/theme';
import AppCard from '../../components/common/AppCard';
import { AuthContext } from '../../context/AuthContext';
import { login as apiLogin } from '../../services/authService';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      // call backend (fallback to local mock)
      const res = await apiLogin({ email, password });
      if (res && res.user) {
        await login(res.user, res.token || null);
        navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
      } else {
        setError('Invalid credentials');
      }
    } catch (e) {
      setError('Login failed');
    }
    setLoading(false);
  };

  const continueGuest = () => {
    navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.top}>
        <Text style={styles.title}>EcoHealth</Text>
        <Text style={styles.subtitle}>Your Climate & Health Companion</Text>
      </View>

      <AppCard>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          accessibilityLabel="Email input"
        />

        <Text style={[styles.label, { marginTop: theme.spacing.sm }]}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          accessibilityLabel="Password input"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          activeOpacity={0.8}
          accessibilityLabel="Login button"
        >
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.demoBtn} 
          onPress={() => {
            setEmail('demo@ecohealth.local');
            setPassword('password123');
          }}
          accessibilityLabel="Fill demo credentials"
        >
          <Text style={styles.demoBtnText}>Try Demo Credentials</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={continueGuest}>
          <Text style={styles.linkText} accessibilityRole="button">Continue as Guest</Text>
        </TouchableOpacity>
      </AppCard>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  top: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  subtitle: {
    marginTop: 8,
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  label: {
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderColor: theme.colors.border,
    borderWidth: 1,
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.textPrimary,
  },
  button: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: theme.fonts.sizes.md,
  },
  demoBtn: {
    marginTop: theme.spacing.sm,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  demoBtnText: {
    color: theme.colors.secondary,
    fontWeight: '500',
    fontSize: theme.fonts.sizes.sm,
  },
  link: {
    marginTop: theme.spacing.sm,
    alignSelf: 'center',
  },
  linkText: {
    color: theme.colors.secondary,
    fontSize: theme.fonts.sizes.sm,
  },
  error: {
    color: theme.colors.danger,
    marginTop: theme.spacing.sm,
  },
});
