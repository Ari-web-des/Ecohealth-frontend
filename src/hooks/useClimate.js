import { useEffect, useState } from "react";
import { getCurrentClimate, getAirQuality } from "../services/climateService";
import useLocation from "./useLocation";
import { Platform } from "react-native";

export default function useClimate() {
  const { coords } = useLocation();

  const [climate, setClimate] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchClimateWithCoords = async (lat, lon) => {
    try {
      const weather = await getCurrentClimate(lat, lon);
      const air = await getAirQuality(lat, lon);

      setClimate({
        ...weather,
        ...air,
      });
    } catch (error) {
      console.log("Climate API error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  // 🌐 WEB fallback (no real GPS)
  if (Platform.OS === 'web') {
    console.log('Web detected, using fallback location');

    // Example: Bengaluru coords
    fetchClimateWithCoords(12.9716, 77.5946);
    return;
  }

  if (!coords) return;

  fetchClimateWithCoords(coords.latitude, coords.longitude);
}, [coords]);

  console.log("coords:", coords);

  return { climate, loading };
}
