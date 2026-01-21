import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../constants/theme";
import { setItem } from "../../utils/storage";

export default function PermissionsScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Ionicons
        name="location-outline"
        size={64}
        color={theme.colors.secondary}
      />

      <Text style={styles.title}>Enable Location</Text>
      <Text style={styles.description}>
        EcoHealth uses your location to show accurate climate and health
        insights.
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={async () => {
          if (loading) return;
          setLoading(true);
          await setItem("hasOnboarded", true);
          navigation.replace("MainApp");
        }}
      >
        <Text style={styles.buttonText}>Allow & Continue</Text>
      </TouchableOpacity>

      <Text style={styles.skip}>You can change this later in settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  description: {
    marginTop: 10,
    textAlign: "center",
    fontSize: theme.fonts.sizes.md,
    color: theme.colors.textSecondary,
  },
  button: {
    marginTop: 32,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: theme.fonts.sizes.md,
    fontWeight: "600",
  },
  skip: {
    marginTop: 16,
    fontSize: 12,
    color: theme.colors.textMuted,
  },
});
