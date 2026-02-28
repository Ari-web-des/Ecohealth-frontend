import React, { useEffect, useState, useContext, useRef } from 'react';
import { ScrollView, Text, StyleSheet, Animated, View, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../../constants/theme';
import AppCard from '../../components/common/AppCard';
import PreferencesCard from '../../components/profile/PreferencesCard';
import AppInfoCard from '../../components/profile/AppInfoCard';
import Loader from '../../components/common/Loader';
import { getProfile, updateProfile } from '../../services/profileService';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { auth, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const userId = auth?.user?.id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(!userId);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 350, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    let mounted = true;
    
    // If no userId, user is not logged in
    if (!userId) {
      setLoading(false);
      setError('Not authenticated');
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      const data = await getProfile(userId, auth?.token || null);
      if (!mounted) return;
      if (data) setProfile(data);
      else setError('Unable to load profile');
      setLoading(false);
    };

    fetchProfile();
    return () => (mounted = false);
  }, [userId, auth?.token]);

  const handlePrefChange = async (newPrefs) => {
    setProfile((p) => ({ ...p, preferences: newPrefs }));
    try {
      await updateProfile(userId, { preferences: newPrefs }, auth?.token || null);
    } catch (e) {
      setError('Failed to update preferences');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (e) {
      // ignore
    }
  };

  const startEdit = () => {
    setEditedName(profile?.name || '');
    setEditedLocation(profile?.location || '');
    setIsEditing(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = { name: editedName, location: editedLocation };
      const updated = await updateProfile(userId, payload, auth?.token || null);
      if (updated) setProfile(updated);
      setIsEditing(false);
    } catch (e) {
      setError('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const reloadProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfile(userId, auth?.token || null);
      if (data) setProfile(data);
      else setError('Unable to load profile');
    } catch (e) {
      setError('Unable to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!profile || error) {
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top }]}>
          <AppCard>
            <Text style={styles.name}>Profile unavailable</Text>
            <Text style={styles.subHeading}>
              {error === 'Not authenticated' 
                ? 'You need to log in to view your profile.' 
                : 'Unable to connect to the profile service. Please ensure the backend server is running (http://localhost:5000) and try reloading.'}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: theme.spacing.md }}>
              {error !== 'Not authenticated' && (
                <TouchableOpacity style={[styles.saveBtn, { marginRight: theme.spacing.sm }]} onPress={reloadProfile}>
                  <Text style={styles.saveText}>Reload</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.logoutText}>Login</Text>
              </TouchableOpacity>
            </View>
          </AppCard>
        </ScrollView>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top }]}>
        <Text style={styles.heading}>Profile</Text>
        <Text style={styles.subHeading}>Your account & preferences</Text>

        <AppCard style={styles.headerCard}>
          <View style={styles.rowTop}>
            <View style={styles.avatarLarge}>
              <Ionicons name="person" size={36} color="#fff" />
            </View>

            <View style={styles.headerInfo}>
              {isEditing ? (
                <>
                  <TextInput value={editedName} onChangeText={setEditedName} style={styles.input} placeholder="Display name" />
                  <TextInput value={editedLocation} onChangeText={setEditedLocation} style={styles.input} placeholder="Location (city)" />
                </>
              ) : (
                <>
                  <Text style={styles.name}>{profile?.name || 'EcoHealth User'}</Text>
                  <Text style={styles.email}>{profile?.email}</Text>
                  <Text style={styles.location}>{profile?.location || 'Location not set'}</Text>
                </>
              )}
            </View>

            <View style={styles.headerActions}>
              {isEditing ? (
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave} accessibilityRole="button">
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.editBtn} onPress={startEdit} accessibilityRole="button">
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </AppCard>

        <PreferencesCard preferences={profile?.preferences} onChange={handlePrefChange} />
        <AppInfoCard />

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Community')}>
            <Text style={styles.primaryText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} accessibilityRole="button">
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: 120,
  },
  heading: {
    fontSize: theme.fonts.sizes.xl,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  subHeading: {
    marginBottom: theme.spacing.lg,
    color: theme.colors.textSecondary,
  },
  error: { color: theme.colors.danger, marginTop: theme.spacing.sm },
  headerCard: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  rowTop: { flexDirection: 'row', alignItems: 'center' },
  avatarLarge: { width: 72, height: 72, borderRadius: 36, backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: theme.spacing.md },
  headerInfo: { flex: 1 },
  name: { fontSize: theme.fonts.sizes.lg, fontWeight: '700', color: theme.colors.textPrimary },
  email: { color: theme.colors.textSecondary, marginTop: 4 },
  location: { color: theme.colors.textSecondary, marginTop: 2 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  headerActions: { marginLeft: theme.spacing.md },
  editBtn: { backgroundColor: theme.colors.card, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  editText: { color: theme.colors.textPrimary, fontWeight: '600' },
  saveBtn: { backgroundColor: theme.colors.primary, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  saveText: { color: '#fff', fontWeight: '700' },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: theme.spacing.md },
  primaryBtn: { flex: 1, backgroundColor: '#0EA5A4', paddingVertical: 12, borderRadius: 8, marginRight: theme.spacing.sm, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '700' },
  logoutBtn: { flex: 1, backgroundColor: theme.colors.danger, paddingVertical: 12, borderRadius: 8, marginLeft: theme.spacing.sm, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: '600' },
});
