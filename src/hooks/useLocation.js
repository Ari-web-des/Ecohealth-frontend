import { useEffect, useState } from 'react';
import { getUserLocation, reverseGeocode } from '../services/locationService';

export default function useLocation() {
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const coordinates = await getUserLocation();
        setCoords(coordinates);

        const name = await reverseGeocode(
          coordinates.latitude,
          coordinates.longitude
        );
        setLocationName(name);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { coords, locationName, loading, error };
}
