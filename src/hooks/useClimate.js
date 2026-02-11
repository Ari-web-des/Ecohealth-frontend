import { useEffect, useState } from "react";
import { getCurrentClimate, getAirQuality } from "../services/climateService";
import useLocation from "./useLocation";
import { Platform } from "react-native";
import mockClimateData from "../data/mockClimateData";

let cachedClimate = null;

export default function useClimate() {
  const { coords, loading: locLoading } = useLocation();

  const [climate, setClimate] = useState(cachedClimate);
  const [loading, setLoading] = useState(cachedClimate ? false : true);

  const fetchClimateWithCoords = async (lat, lon) => {
    try {
      const weather = await getCurrentClimate(lat, lon);
      const air = await getAirQuality(lat, lon);

      const combined = {
        ...weather,
        ...air,
      };
      cachedClimate = combined;
      setClimate(combined);
    } catch (error) {
      console.log("Climate API error:", error);
      // fallback to mock
      cachedClimate = mockClimateData;
      setClimate(mockClimateData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If we already have cached data, nothing to do
    if (cachedClimate) return;

    // WEB fallback (no real GPS)
    if (Platform.OS === 'web') {
      // Example: Bengaluru coords
      fetchClimateWithCoords(12.9716, 77.5946);
      return;
    }

    // If location still loading, wait
    if (locLoading) return;

    // If no coords available after location attempt, use mock data
    if (!coords) {
      cachedClimate = mockClimateData;
      setClimate(mockClimateData);
      setLoading(false);
      return;
    }

    fetchClimateWithCoords(coords.latitude, coords.longitude);
  }, [coords, locLoading]);

  // Safety timeout: if still loading after 7s, show mock data
  useEffect(() => {
    const t = setTimeout(() => {
      if (loading) {
        cachedClimate = mockClimateData;
        setClimate(mockClimateData);
        setLoading(false);
      }
    }, 7000);
    return () => clearTimeout(t);
  }, [loading]);

  return { climate, loading };
}
