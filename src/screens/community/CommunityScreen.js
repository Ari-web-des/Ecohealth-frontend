import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import AppCard from '../../components/common/AppCard';
import theme from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { BACKEND_URL } from '../../config/apiConfig';
import Loader from '../../components/common/Loader';

const SAMPLE_ALERTS = [
  { id: 'a1', type: 'HighSmog', title: 'Heavy smog near industrial area', tag: 'HighSmog', location: 'Sector 18, Industrial Area', time: '2/11/2026, 7:35 PM', verified: true, upvotes: 15 },
  { id: 'a2', type: 'WaterShortage', title: 'Public water supply disrupted', tag: 'WaterShortage', location: 'Sector 25, Residential Colony', time: '2/11/2026, 4:35 PM', verified: false, upvotes: 8 },
  { id: 'a3', type: 'CoolingCenter', title: 'Community center opened as cooling center', tag: 'Cooling Center Open', location: 'Sector 5, Community Park', time: '2/11/2026, 8:35 PM', verified: true, upvotes: 23 },
];

const SAMPLE_SERVICES = [
  { id: 's1', category: 'Hospitals', name: 'Apollo Hospital', address: 'MG Road, Sector 12', distance: '1.2 km', emergency: true, rating: 4.5 },
  { id: 's2', category: 'Hospitals', name: 'Max Hospital', address: 'Nehru Place, Sector 18', distance: '2.5 km', emergency: true, rating: 4.3 },
  { id: 's3', category: 'Pharmacies', name: 'MedPlus Pharmacy', address: 'Main Market, Sector 8', distance: '0.5 km', open24: true, rating: 4.2 },
  { id: 's4', category: 'Cooling', name: 'Community Center - Sector 5', address: 'Community Park, Sector 5', distance: '0.9 km', capacity: 'High' },
];

export default function CommunityScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [alerts, setAlerts] = useState(null);
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const aRes = await fetch(`${BACKEND_URL}/api/alerts`);
        const alertsJson = aRes.ok ? await aRes.json() : SAMPLE_ALERTS;

        const sRes = await fetch(`${BACKEND_URL}/api/services${category && category !== 'All' ? `?category=${category}` : ''}`);
        const servicesJson = sRes.ok ? await sRes.json() : SAMPLE_SERVICES;

        if (!mounted) return;
        setAlerts(alertsJson || SAMPLE_ALERTS);
        setServices(servicesJson || SAMPLE_SERVICES);
      } catch (e) {
        setAlerts(SAMPLE_ALERTS);
        setServices(SAMPLE_SERVICES);
      }
      if (mounted) setLoading(false);
    };

    fetchData();
    return () => (mounted = false);
  }, [category]);

  const filteredAlerts = useMemo(() => {
    if (!alerts) return SAMPLE_ALERTS;
    if (!query) return alerts;
    return alerts.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()) || a.location.toLowerCase().includes(query.toLowerCase()));
  }, [query, alerts]);

  const filteredServices = useMemo(() => {
    if (!services) return SAMPLE_SERVICES;
    let items = services;
    if (category !== 'All') items = items.filter((s) => (category === 'Cooling' ? s.category === 'Cooling' : s.category === category));
    if (!query) return items;
    return items.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.address.toLowerCase().includes(query.toLowerCase()));
  }, [query, category, services]);

  const openMaps = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch(() => {});
  };

  const callNumber = (phone = 'tel:') => {
    Linking.openURL(phone).catch(() => {});
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Community Alerts & Services</Text>

      <View style={styles.searchRow} accessible accessibilityRole="search">
        <Ionicons name="search-outline" size={18} color={theme.colors.textMuted} />
        <TextInput
          placeholder="Search for services or alerts..."
          placeholderTextColor={theme.colors.textMuted}
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          accessibilityLabel="Search services and alerts"
        />
      </View>

      <View style={styles.chipsRow}>
        {['All', 'Hospitals', 'Pharmacies', 'Cooling'].map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.chip, category === c && styles.chipActive]}
            onPress={() => setCategory(c)}
            activeOpacity={0.8}
          >
            <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Government Alerts</Text>
      {loading ? (
        <Loader />
      ) : filteredAlerts.length === 0 ? (
        <AppCard>
          <Text style={styles.cardText}>No active government alerts.</Text>
        </AppCard>
      ) : (
        filteredAlerts.map((a) => (
          <AppCard key={a.id} style={{ paddingVertical: theme.spacing.sm }}>
            <View style={styles.alertRow}>
              <View style={styles.alertLeft}>
                <Text style={styles.alertTitle}>{a.title}</Text>
                <Text style={styles.alertMeta}>{a.location} • {new Date(a.time).toLocaleString()}</Text>
                <View style={styles.tagsRow}>
                  <View style={styles.tag}>{a.verified ? <Text style={styles.tagText}>Verified</Text> : <Text style={styles.tagTextMuted}>Unverified</Text>}</View>
                  <View style={[styles.tag, { backgroundColor: '#eef6ff' }]}><Text style={[styles.tagText, { color: theme.colors.primary }]}>{a.upvotes} upvotes</Text></View>
                </View>
              </View>
              <View style={styles.alertActions}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => {}} accessibilityLabel={`Share alert ${a.title}`}>
                  <Ionicons name="share-outline" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          </AppCard>
        ))
      )}

      <Text style={styles.sectionTitle}>Nearby Services</Text>
      {loading ? (
        <Loader />
      ) : (
        filteredServices.map((s) => (
          <AppCard key={s.id} style={{ paddingVertical: theme.spacing.sm }}>
            <View style={styles.serviceRow}>
              <View>
                <Text style={styles.serviceName}>{s.name}</Text>
                <Text style={styles.serviceMeta}>{s.address}</Text>
                <View style={styles.serviceMetaRow}>
                  <View style={styles.smallBadge}><Text style={styles.smallBadgeText}>{s.distance}</Text></View>
                  {s.emergency ? <View style={[styles.smallBadge, { backgroundColor: '#feeaea' }]}><Text style={[styles.smallBadgeText, { color: theme.colors.danger }]}>24/7 Emergency</Text></View> : null}
                  {s.open24 ? <View style={[styles.smallBadge, { backgroundColor: '#e9fdf3' }]}><Text style={[styles.smallBadgeText, { color: theme.colors.success }]}>Open24x7</Text></View> : null}
                  {s.capacity ? <View style={[styles.smallBadge, { backgroundColor: '#eef7ff' }]}><Text style={[styles.smallBadgeText, { color: theme.colors.secondary }]}>{`Capacity: ${s.capacity}`}</Text></View> : null}
                </View>
              </View>

              <View style={styles.serviceActions}>
                <TouchableOpacity style={styles.outlineBtn} onPress={() => openMaps(s.address)} accessibilityLabel={`Get directions to ${s.name}`}>
                  <Ionicons name="navigate-outline" size={16} color={theme.colors.textPrimary} />
                  <Text style={styles.outlineBtnText}>Directions</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.outlineBtn} onPress={() => callNumber(`tel:${s.phone || '+911'}`)} accessibilityLabel={`Call ${s.name}`}>
                  <Ionicons name="call-outline" size={16} color={theme.colors.textPrimary} />
                  <Text style={styles.outlineBtnText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          </AppCard>
        ))
      )}

      <Text style={styles.sectionTitle}>Emergency Contacts</Text>
      <AppCard>
        <Text style={styles.cardText}>Local Emergency: 911</Text>
        <Text style={styles.cardText}>Poison Control: 1-800-222-1222</Text>
      </AppCard>

      <Text style={styles.sectionTitle}>Community Reports</Text>
      <AppCard>
        <View>
          <Text style={styles.reportTitle}>Heavy smog near industrial area.</Text>
          <Text style={styles.cardText}>Active reports: 4 • Upvotes: 51 • Verified: 2</Text>
        </View>
      </AppCard>

      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface },
  content: { padding: theme.spacing.md, paddingBottom: theme.spacing.xxl },
  heading: {
    fontSize: theme.fonts.sizes.xl,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 8,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchInput: {
    marginLeft: theme.spacing.sm,
    flex: 1,
    height: 36,
    color: theme.colors.textPrimary,
  },
  chipsRow: { flexDirection: 'row', marginBottom: theme.spacing.md },
  chip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipActive: { backgroundColor: '#e9f5ef', borderColor: theme.colors.primary },
  chipText: { color: theme.colors.textSecondary },
  chipTextActive: { color: theme.colors.primary, fontWeight: '600' },
  sectionTitle: { fontSize: theme.fonts.sizes.lg, fontWeight: '600', marginBottom: theme.spacing.sm, color: theme.colors.textPrimary },
  cardText: { fontSize: theme.fonts.sizes.sm, color: theme.colors.textSecondary },
  alertRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  alertLeft: { flex: 1 },
  alertTitle: { fontSize: theme.fonts.sizes.md, fontWeight: '600', color: theme.colors.textPrimary },
  alertMeta: { fontSize: theme.fonts.sizes.sm, color: theme.colors.textMuted, marginTop: 4 },
  tagsRow: { flexDirection: 'row', marginTop: theme.spacing.sm },
  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: '#fff', marginRight: theme.spacing.sm, borderWidth: 1, borderColor: theme.colors.border },
  tagText: { fontSize: 12, color: theme.colors.textPrimary },
  tagTextMuted: { fontSize: 12, color: theme.colors.textMuted },
  alertActions: { marginLeft: theme.spacing.md },
  iconBtn: { padding: 8 },
  serviceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serviceName: { fontSize: theme.fonts.sizes.md, fontWeight: '600', color: theme.colors.textPrimary },
  serviceMeta: { fontSize: theme.fonts.sizes.sm, color: theme.colors.textSecondary, marginTop: 4 },
  serviceMetaRow: { flexDirection: 'row', marginTop: theme.spacing.sm, alignItems: 'center' },
  smallBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: '#fff', marginRight: theme.spacing.sm, borderWidth: 1, borderColor: theme.colors.border },
  smallBadgeText: { fontSize: 12, color: theme.colors.textSecondary },
  serviceActions: { flexDirection: 'row' },
  outlineBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: theme.colors.border, marginLeft: theme.spacing.sm },
  outlineBtnText: { marginLeft: 6, color: theme.colors.textPrimary },
  reportTitle: { fontSize: theme.fonts.sizes.md, fontWeight: '600', color: theme.colors.textPrimary },
});
