import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AppCard from '../common/AppCard';
import theme from '../../constants/theme';

export default function ActivityPlanner({ location, userProfile }) {
  const [safeHours, setSafeHours] = useState([]);

  useEffect(() => {
    const hours = [];
    const now = new Date();
    for (let i = 0; i < 24; i++) {
      const hour = new Date(now);
      hour.setHours(i, 0, 0, 0);
      const temp = 25 + Math.sin((i - 6) * Math.PI / 12) * 15;
      const feelsLike = temp + (i >= 10 && i <= 16 ? 5 : 0);
      const aqi = 100 + Math.sin((i - 8) * Math.PI / 10) * 80;
      const uvIndex = i >= 10 && i <= 16 ? 8 - Math.abs(i - 13) : 0;
      let safety = 'safe';
      if (feelsLike > 38 || aqi > 200) safety = 'unsafe';
      else if (feelsLike > 35 || aqi > 150) safety = 'caution';
      else if (feelsLike > 30 || aqi > 100) safety = 'moderate';
      hours.push({ time: hour, hour: i, temp: Math.round(temp), feelsLike: Math.round(feelsLike), aqi: Math.round(aqi), uvIndex: Math.round(uvIndex), safety });
    }
    setSafeHours(hours);
  }, [location]);

  const getSafetyColor = (s) => {
    switch (s) {
      case 'safe': return '#10B981';
      case 'moderate': return '#F59E0B';
      case 'caution': return '#FB923C';
      case 'unsafe': return '#EF4444';
      default: return '#9CA3AF';
    }
  };

  const currentHour = new Date().getHours();
  const currentConditions = safeHours.find(h => h.hour === currentHour) || null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Outdoor Activity Planner</Text>
      <Text style={styles.subHeading}>Plan outdoor activities based on heat and AQI</Text>

      {currentConditions && (
        <AppCard style={{ backgroundColor: '#F0F9FF' }}>
          <Text style={styles.cardTitle}>Current Conditions</Text>
          <View style={styles.row}>
            <View style={styles.col}><Text style={styles.small}>Temperature</Text><Text style={styles.big}>{currentConditions.temp}°C</Text></View>
            <View style={styles.col}><Text style={styles.small}>Feels Like</Text><Text style={styles.big}>{currentConditions.feelsLike}°C</Text></View>
            <View style={styles.col}><Text style={styles.small}>AQI</Text><Text style={styles.big}>{currentConditions.aqi}</Text></View>
            <View style={styles.col}><Text style={styles.small}>UV</Text><Text style={styles.big}>{currentConditions.uvIndex}</Text></View>
          </View>
          <View style={[styles.safetyBadge, { backgroundColor: getSafetyColor(currentConditions.safety) }]}>
            <Text style={styles.safetyText}>{currentConditions.safety.toUpperCase()}</Text>
          </View>
        </AppCard>
      )}

      <AppCard>
        <Text style={styles.cardTitle}>24-Hour Activity Timeline</Text>
        <FlatList
          data={safeHours}
          horizontal
          keyExtractor={(i) => String(i.hour)}
          renderItem={({ item }) => (
            <View style={[styles.hourBox, { backgroundColor: getSafetyColor(item.safety) }]}>
              <Text style={styles.hourLabel}>{item.hour}:00</Text>
              <Text style={styles.hourSmall}>{item.temp}°</Text>
            </View>
          )}
        />
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Recommended Activity Windows</Text>
        <View style={styles.windowsRow}>
          <View style={[styles.windowBox, { backgroundColor: '#ECFDF5' }]}>
            <Text style={styles.windowLabel}>Morning</Text>
            <Text style={styles.windowTime}>6:00 AM - 9:00 AM</Text>
          </View>
          <View style={[styles.windowBox, { backgroundColor: '#EFF6FF' }]}>
            <Text style={styles.windowLabel}>Evening</Text>
            <Text style={styles.windowTime}>6:00 PM - 8:00 PM</Text>
          </View>
        </View>
      </AppCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 24 },
  heading: { fontSize: theme.fonts.sizes.xl, fontWeight: '700', color: theme.colors.textPrimary },
  subHeading: { color: theme.colors.textSecondary, marginBottom: theme.spacing.md },
  cardTitle: { fontSize: theme.fonts.sizes.lg, fontWeight: '600', marginBottom: theme.spacing.sm, color: theme.colors.textPrimary },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  col: { flex: 1, alignItems: 'center' },
  small: { color: theme.colors.textSecondary },
  big: { fontSize: 18, fontWeight: '700', color: theme.colors.textPrimary },
  safetyBadge: { marginTop: theme.spacing.sm, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, alignSelf: 'flex-start' },
  safetyText: { color: '#fff', fontWeight: '700' },
  hourBox: { width: 80, height: 80, borderRadius: 8, marginRight: 8, alignItems: 'center', justifyContent: 'center' },
  hourLabel: { color: '#fff', fontWeight: '700' },
  hourSmall: { color: '#fff' },
  windowsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  windowBox: { flex: 1, padding: 12, borderRadius: 8, marginRight: 8 },
  windowLabel: { fontWeight: '700' },
  windowTime: { color: theme.colors.textSecondary },
});
