import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AppCard from '../common/AppCard';
import theme from '../../constants/theme';
import StatusBadge from '../common/StatusBadge';

export default function HealthInsights({ userProfile }) {
  const stats = {
    safeDaysThisWeek: 5,
    totalDaysTracked: 45,
    hydrationCompliance: 82,
    averageAQIExposure: 125,
    averageTempExposure: 36,
    achievementsUnlocked: 8,
    currentStreak: 5,
    longestStreak: 12,
  };

  const achievements = [
    { id: 1, name: 'Early Bird', description: 'Checked app every morning for 7 days', unlocked: true, icon: '🌅' },
    { id: 2, name: 'Hydration Hero', description: 'Met hydration goal 10 days in a row', unlocked: true, icon: '💧' },
    { id: 3, name: 'Safety First', description: 'Avoided outdoor activity during 5 extreme warnings', unlocked: true, icon: '🛡️' },
    { id: 4, name: 'Weather Warrior', description: 'Used app for 30 consecutive days', unlocked: true, icon: '⚡' },
    { id: 5, name: 'Health Guardian', description: 'Followed all precautions during heatwave', unlocked: false, icon: '🏆' },
    { id: 6, name: 'Community Helper', description: 'Submit 5 community reports', unlocked: false, icon: '🤝' },
  ];

  const weeklyData = [
    { day: 'Mon', riskLevel: 'low', compliant: true },
    { day: 'Tue', riskLevel: 'moderate', compliant: true },
    { day: 'Wed', riskLevel: 'high', compliant: true },
    { day: 'Thu', riskLevel: 'moderate', compliant: true },
    { day: 'Fri', riskLevel: 'low', compliant: true },
    { day: 'Sat', riskLevel: 'high', compliant: false },
    { day: 'Sun', riskLevel: 'extreme', compliant: true },
  ];

  const renderStatCard = (title, value, color) => (
    <AppCard style={[styles.statCard, { backgroundColor: color || '#fff' }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{title}</Text>
    </AppCard>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Health Insights</Text>
      <Text style={styles.subHeading}>Track your progress and achievements</Text>

      <View style={styles.grid}>
        {renderStatCard('Day Streak', stats.currentStreak, '#EEF7F0')}
        {renderStatCard('Safe Days This Week', `${stats.safeDaysThisWeek}/7`, '#F0F9FF')}
        {renderStatCard('Hydration', `${stats.hydrationCompliance}%`, '#F8F0FF')}
        {renderStatCard('Achievements', stats.achievementsUnlocked, '#FFF7ED')}
      </View>

      <AppCard>
        <Text style={styles.cardTitle}>Your Health Impact</Text>
        <Text style={styles.cardDesc}>How following precautions helped you</Text>
        <View style={styles.impactRow}>
          <View style={styles.impactBox}>
            <Text style={styles.impactValue}>15</Text>
            <Text style={styles.impactLabel}>Extreme risk days avoided</Text>
          </View>
          <View style={styles.impactBox}>
            <Text style={styles.impactValue}>~2.5L</Text>
            <Text style={styles.impactLabel}>Extra water consumed</Text>
          </View>
          <View style={styles.impactBox}>
            <Text style={styles.impactValue}>85%</Text>
            <Text style={styles.impactLabel}>Precautions followed</Text>
          </View>
        </View>
        <Text style={styles.impactNote}>Based on your compliance, you've likely reduced heat-related risk by ~70% this month.</Text>
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Weekly Compliance</Text>
        <Text style={styles.cardDesc}>Your adherence to safety precautions</Text>
        <View style={styles.weekRow}>
          {weeklyData.map((d, i) => (
            <View key={i} style={styles.weekDay}>
              <View style={[styles.weekBox, d.compliant ? styles.safeBox : styles.unsafeBox]}>
                <Text style={styles.weekMark}>{d.compliant ? '✓' : '✗'}</Text>
              </View>
              <Text style={styles.weekLabel}>{d.day}</Text>
            </View>
          ))}
        </View>
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Achievements</Text>
        <Text style={styles.cardDesc}>{stats.achievementsUnlocked} of {achievements.length} unlocked</Text>
        <FlatList
          data={achievements}
          keyExtractor={(i) => String(i.id)}
          renderItem={({ item }) => (
            <View style={[styles.achievementRow, item.unlocked ? styles.unlocked : styles.locked]}>
              <Text style={styles.achievementIcon}>{item.icon}</Text>
              <View style={{flex:1}}>
                <Text style={styles.achievementName}>{item.name}{item.unlocked ? ' ✓' : ''}</Text>
                <Text style={styles.achievementDesc}>{item.description}</Text>
              </View>
            </View>
          )}
        />
      </AppCard>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 24 },
  heading: { fontSize: theme.fonts.sizes.xl, fontWeight: '700', color: theme.colors.textPrimary },
  subHeading: { color: theme.colors.textSecondary, marginBottom: theme.spacing.md },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.md },
  statCard: { flex: 1, marginRight: 8, paddingVertical: 12 },
  statValue: { fontSize: 20, fontWeight: '700', color: theme.colors.textPrimary },
  statLabel: { color: theme.colors.textSecondary, marginTop: 6 },
  cardTitle: { fontSize: theme.fonts.sizes.lg, fontWeight: '600', color: theme.colors.textPrimary, marginBottom: 6 },
  cardDesc: { color: theme.colors.textSecondary, marginBottom: theme.spacing.sm },
  impactRow: { flexDirection: 'row', justifyContent: 'space-between' },
  impactBox: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, marginRight: 8 },
  impactValue: { fontSize: 18, fontWeight: '700', color: theme.colors.primary },
  impactLabel: { color: theme.colors.textSecondary, marginTop: 6 },
  impactNote: { marginTop: theme.spacing.sm, color: theme.colors.textSecondary },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: theme.spacing.sm },
  weekDay: { alignItems: 'center', flex: 1 },
  weekBox: { width: 40, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  safeBox: { backgroundColor: '#10B981' },
  unsafeBox: { backgroundColor: '#FCA5A5' },
  weekMark: { color: '#fff', fontWeight: '700' },
  weekLabel: { marginTop: 6, color: theme.colors.textSecondary },
  achievementRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  achievementIcon: { fontSize: 22, marginRight: 12 },
  achievementName: { fontWeight: '600' },
  achievementDesc: { color: theme.colors.textSecondary, fontSize: theme.fonts.sizes.sm },
  unlocked: { backgroundColor: '#FFFBEB' },
  locked: { opacity: 0.6 },
});
