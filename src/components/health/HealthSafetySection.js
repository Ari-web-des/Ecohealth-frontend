import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import theme from "../../constants/theme";
import { useClimateContext } from "../../context/ClimateContext";

export default function HealthSafetySection() {
  const { climate } = useClimateContext();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const aqi = climate?.aqi || 0;

  const getSeverity = () => {
    if (aqi >= 300)
      return { label: "Severe Risk", color: "#C92A2A", bg: "#FFF5F5" };
    if (aqi >= 200)
      return { label: "High Risk", color: "#E8590C", bg: "#FFF4E6" };
    if (aqi >= 100)
      return { label: "Moderate Risk", color: "#F08C00", bg: "#FFF9DB" };
    return { label: "Low Risk", color: "#2B8A3E", bg: "#EBFBEE" };
  };

  const severity = getSeverity();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Health & Safety Precautions</Text>

      {/* Risk Indicator */}
      <View style={[styles.riskBanner, { backgroundColor: severity.bg }]}>
        <View style={[styles.riskDot, { backgroundColor: severity.color }]} />
        <Text style={[styles.riskText, { color: severity.color }]}>
          Current AQI: {aqi} — {severity.label}
        </Text>
      </View>

      {/* Cards Row */}
      <View
        style={[
          styles.row,
          { flexDirection: isMobile ? "column" : "row" },
        ]}
      >
        {/* Outdoor Activity */}
        <View style={[styles.card, { borderTopColor: severity.color }]}>
          <Text style={styles.cardTitle}>⚡ Outdoor Activity</Text>
          <Text style={styles.cardText}>
            {aqi >= 200
              ? "Avoid outdoor exercise during peak heat (12 PM - 3 PM). Consider indoor alternatives."
              : "Outdoor activity is safe. Prefer morning or evening hours."}
          </Text>
        </View>

        {/* Emergency Preparedness */}
        <View style={[styles.card, { borderTopColor: "#FA5252" }]}>
          <Text style={styles.cardTitle}>⚠ Emergency Preparedness</Text>
          <Text style={styles.cardText}>
            Identify nearby hospitals & cooling centers. Monitor for dizziness,
            nausea, shortness of breath, or fatigue.
          </Text>
        </View>
      </View>

      {/* First Aid Card */}
      <View style={[styles.card, styles.firstAidCard]}>
        <Text style={styles.cardTitle}>🚑 Emergency First Aid</Text>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletTitle}>Heat Stroke:</Text>
          <Text style={styles.bulletText}>
            Move to shade, cool body with water, seek medical help immediately.
          </Text>
        </View>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletTitle}>Dehydration:</Text>
          <Text style={styles.bulletText}>
            Drink water slowly, rest in a cool place, use oral rehydration salts.
          </Text>
        </View>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletTitle}>Asthma Attack:</Text>
          <Text style={styles.bulletText}>
            Use rescue inhaler, sit upright, breathe slowly. Call doctor if severe.
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },
  heading: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: "700",
    marginBottom: 16,
    color: theme.colors.textPrimary,
  },
  riskBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 18,
  },
  riskDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  riskText: {
    fontWeight: "600",
    fontSize: theme.fonts.sizes.sm,
  },
  row: {
    gap: 16,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    borderTopWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  firstAidCard: {
    borderTopColor: "#228BE6",
  },
  cardTitle: {
    fontSize: theme.fonts.sizes.md,
    fontWeight: "600",
    marginBottom: 10,
    color: theme.colors.textPrimary,
  },
  cardText: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  bulletRow: {
    marginBottom: 10,
  },
  bulletTitle: {
    fontWeight: "600",
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textPrimary,
  },
  bulletText: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textSecondary,
  },
});