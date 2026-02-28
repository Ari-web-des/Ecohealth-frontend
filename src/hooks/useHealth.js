import { useEffect, useState } from 'react';
import { getHealthData } from '../services/healthService';
// import useLocation from './useLocation';
// import { Platform } from 'react-native';

export default function useHealth() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      const data = await getHealthData();
      setHealth(data);
      setLoading(false);
    };

    fetchHealth();
  }, []);

  return { health, loading };
}