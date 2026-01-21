import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppCard from "../common/AppCard";
import theme from "../../constants/theme";
import useLocation from "../../hooks/useLocation";
import Loader from "../common/Loader";

export default function ProfileHeaderCard() {
  const { locationName, loading } = useLocation();

  if (loading) return <Loader />;
  return (
    <AppCard>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={32} color="#fff" />
        </View>

        <View>
          <Text style={styles.name}>EcoHealth User</Text>
          <Text style={styles.location}>
            {loading
              ? "Fetching location..."
              : locationName || "Location unavailable"}
          </Text>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  name: {
    fontSize: theme.fonts.sizes.lg,
    fontWeight: "600",
    color: theme.colors.textPrimary,
  },
  location: {
    fontSize: theme.fonts.sizes.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
});
