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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppCard from '../../components/common/AppCard';
import theme from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { BACKEND_URL } from '../../config/apiConfig';
import Loader from '../../components/common/Loader';
import * as Location from 'expo-location';
import { getUserLocation } from '../../services/locationService';

const SAMPLE_ALERTS = [
  { id: 'a1', type: 'HighSmog', title: 'Heavy smog near industrial area', tag: 'HighSmog', location: 'Sector 18, Industrial Area', time: '2/11/2026, 7:35 PM', verified: true, upvotes: 15 },
  { id: 'a2', type: 'WaterShortage', title: 'Public water supply disrupted', tag: 'WaterShortage', location: 'Sector 25, Residential Colony', time: '2/11/2026, 4:35 PM', verified: false, upvotes: 8 },
  { id: 'a3', type: 'CoolingCenter', title: 'Community center opened as cooling center', tag: 'Cooling Center Open', location: 'Sector 5, Community Park', time: '2/11/2026, 8:35 PM', verified: true, upvotes: 23 },
];

const SAMPLE_SERVICES = [
  { id: 's1', category: 'Hospitals', name: 'Apollo Hospital', address: 'MG Road, Sector 12', distance: '1.2 km', emergency: true, rating: 4.5, latitude: 28.7046, longitude: 77.1025, phone: '+911234567890' },
  { id: 's2', category: 'Hospitals', name: 'Max Hospital', address: 'Nehru Place, Sector 18', distance: '2.5 km', emergency: true, rating: 4.3, latitude: 28.7060, longitude: 77.1080, phone: '+911234567891' },
  { id: 's3', category: 'Pharmacies', name: 'MedPlus Pharmacy', address: 'Main Market, Sector 8', distance: '0.5 km', open24: true, rating: 4.2, latitude: 28.7038, longitude: 77.1010, phone: '+911234567892' },
  { id: 's4', category: 'Cooling', name: 'Community Center - Sector 5', address: 'Community Park, Sector 5', distance: '0.9 km', capacity: 'High', latitude: 28.7052, longitude: 77.1005, phone: '+911234567893' },
];

export default function CommunityScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [alerts, setAlerts] = useState(null);
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const insets = useSafeAreaInsets();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const coords = await getUserLocation();
          if (!mounted) return;
          setUserLocation({ coords });
        }
      } catch (e) {
        // ignore location errors
      }
    })();

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const aRes = await fetch(`${BACKEND_URL}/api/alerts`);
        const alertsJson = aRes.ok ? await aRes.json() : SAMPLE_ALERTS;

        let servicesJson = null;
        // if we have userLocation, request server Places proxy
        if (userLocation && userLocation.coords) {
          try {
            const lat = userLocation.coords.latitude;
            const lon = userLocation.coords.longitude;
            const typeMap = { All: '', Hospitals: 'hospital', Pharmacies: 'pharmacy', Cooling: 'point_of_interest' };
            const type = typeMap[category] || '';
            const url = `${BACKEND_URL}/api/places?lat=${lat}&lon=${lon}${type ? `&type=${type}` : ''}&radius=5000`;
            const sRes = await fetch(url);
            servicesJson = sRes.ok ? await sRes.json() : null;
            // map results into same shape as sample
            if (servicesJson && Array.isArray(servicesJson)) {
              servicesJson = servicesJson.map((p) => ({ id: p.id, category: category === 'All' ? 'Services' : category, name: p.name, address: p.address, latitude: p.latitude, longitude: p.longitude, rating: p.rating }));
            }
          } catch (e) {
            servicesJson = null;
          }
        }

        if (!servicesJson) {
          // fallback to legacy services API or local sample
          const sRes = await fetch(`${BACKEND_URL}/api/services${category && category !== 'All' ? `?category=${category}` : ''}`);
          servicesJson = sRes.ok ? await sRes.json() : SAMPLE_SERVICES;
        }

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
  }, [category, userLocation]);

  const filteredAlerts = useMemo(() => {
    if (!alerts) return SAMPLE_ALERTS;
    if (!query) return alerts;
    return alerts.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()) || a.location.toLowerCase().includes(query.toLowerCase()));
  }, [query, alerts]);

  const filteredServices = useMemo(() => {
    if (!services) return SAMPLE_SERVICES;
    // compute distances if we have userLocation and service coords
    const withDistance = services.map((s) => {
      if (s.latitude && s.longitude && userLocation && userLocation.coords) {
        const toRad = (v) => (v * Math.PI) / 180;
        const R = 6371; // km
        const dLat = toRad(s.latitude - userLocation.coords.latitude);
        const dLon = toRad(s.longitude - userLocation.coords.longitude);
        const lat1 = toRad(userLocation.coords.latitude);
        const lat2 = toRad(s.latitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return { ...s, __distanceKm: d };
      }
      return s;
    });
    let items = withDistance;
    if (category !== 'All') items = items.filter((s) => (category === 'Cooling' ? s.category === 'Cooling' : s.category === category));
    if (!query) return items;
    return items.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.address.toLowerCase().includes(query.toLowerCase()));
  }, [query, category, services]);

  const openMaps = (serviceOrAddress) => {
    // Accept either a service object with latitude/longitude or an address string
    const hasCoords = serviceOrAddress && serviceOrAddress.latitude && serviceOrAddress.longitude;
    if (hasCoords) {
      const dest = `${serviceOrAddress.latitude},${serviceOrAddress.longitude}`;
      if (userLocation && userLocation.coords) {
        const { latitude, longitude } = userLocation.coords;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${dest}&travelmode=driving`;
        Linking.openURL(url).catch(() => {});
        return;
      }
      const url = `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=driving`;
      Linking.openURL(url).catch(() => {});
      return;
    }

    const address = typeof serviceOrAddress === 'string' ? serviceOrAddress : (serviceOrAddress?.address || '');
    if (userLocation && userLocation.coords) {
      const { latitude, longitude } = userLocation.coords;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(address)}&travelmode=driving`;
      Linking.openURL(url).catch(() => {});
      return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch(() => {});
  };

  const callNumber = (phone = 'tel:') => {
    Linking.openURL(phone).catch(() => {});
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top }]}>
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

      <ScrollView style={styles.chipsRow} horizontal showsHorizontalScrollIndicator={false}>
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
      </ScrollView>

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

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Nearby Services</Text>
        <TouchableOpacity style={styles.mapAction} onPress={() => {
          const cat = category && category !== 'All' ? category : 'services';
          if (userLocation && userLocation.coords) {
            const { latitude, longitude } = userLocation.coords;
            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cat)}+near+${latitude},${longitude}`;
            Linking.openURL(url).catch(() => {});
          } else {
            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cat)}`;
            Linking.openURL(url).catch(() => {});
          }
        }}>
          <Ionicons name="map-outline" size={18} color={theme.colors.primary} />
          <Text style={[styles.chipText, { marginLeft: 8, color: theme.colors.primary }]}>Open Live Map</Text>
        </TouchableOpacity>
      </View>
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
                  <View style={styles.smallBadge}><Text style={styles.smallBadgeText}>{s.__distanceKm ? `${s.__distanceKm.toFixed(1)} km` : s.distance}</Text></View>
                  {s.emergency ? <View style={[styles.smallBadge, { backgroundColor: '#feeaea' }]}><Text style={[styles.smallBadgeText, { color: theme.colors.danger }]}>24/7 Emergency</Text></View> : null}
                  {s.open24 ? <View style={[styles.smallBadge, { backgroundColor: '#e9fdf3' }]}><Text style={[styles.smallBadgeText, { color: theme.colors.success }]}>Open24x7</Text></View> : null}
                  {s.capacity ? <View style={[styles.smallBadge, { backgroundColor: '#eef7ff' }]}><Text style={[styles.smallBadgeText, { color: theme.colors.secondary }]}>{`Capacity: ${s.capacity}`}</Text></View> : null}
                </View>
              </View>

              <View style={styles.serviceActionsCol}>
                <TouchableOpacity style={styles.outlineBtn} onPress={() => openMaps(s)} accessibilityLabel={`Get directions to ${s.name}`}>
                  <Ionicons name="navigate-outline" size={16} color={theme.colors.textPrimary} />
                  <Text style={styles.outlineBtnText}>Dir</Text>
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
  chipsRow: { flexDirection: 'row', marginBottom: theme.spacing.md, paddingVertical: 4 },
  chip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minWidth: 85,
    alignItems: 'center',
  },
  chipActive: { backgroundColor: '#e9f5ef', borderColor: theme.colors.primary },
  chipText: { color: theme.colors.textSecondary },
  chipTextActive: { color: theme.colors.primary, fontWeight: '600' },
  sectionTitle: { fontSize: theme.fonts.sizes.lg, fontWeight: '600', marginBottom: theme.spacing.sm, color: theme.colors.textPrimary },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mapAction: { flexDirection: 'row', alignItems: 'center' },
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
  serviceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: theme.spacing.sm },
  serviceName: { fontSize: theme.fonts.sizes.md, fontWeight: '600', color: theme.colors.textPrimary },
  serviceMeta: { fontSize: theme.fonts.sizes.sm, color: theme.colors.textSecondary, marginTop: 4 },
  serviceMetaRow: { flexDirection: 'row', marginTop: theme.spacing.sm, alignItems: 'center', flexWrap: 'wrap' },
  smallBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: '#fff', marginRight: theme.spacing.sm, marginBottom: 4, borderWidth: 1, borderColor: theme.colors.border },
  smallBadgeText: { fontSize: 12, color: theme.colors.textSecondary },
  serviceActions: { flexDirection: 'row' },
  serviceActionsCol: { flexDirection: 'column', gap: 6, minWidth: 80 },
  outlineBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: theme.colors.border },
  outlineBtnText: { marginLeft: 4, color: theme.colors.textPrimary, fontSize: 12 },
  reportTitle: { fontSize: theme.fonts.sizes.md, fontWeight: '600', color: theme.colors.textPrimary },
});
