import { ScrollView, Text, StyleSheet } from 'react-native';
import theme from '../../constants/theme';

import ProfileHeaderCard from '../../components/profile/ProfileHeaderCard';
import PreferencesCard from '../../components/profile/PreferencesCard';
import AppInfoCard from '../../components/profile/AppInfoCard';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Profile</Text>
      <Text style={styles.subHeading}>Your account & preferences</Text>

      <ProfileHeaderCard />
      <PreferencesCard />
      <AppInfoCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: theme.spacing.md,
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
});
