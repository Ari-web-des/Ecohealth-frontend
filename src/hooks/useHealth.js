import { useEffect, useState } from 'react';
import { getHealthData } from '../services/healthService';

export default function useHealth() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHealthData();
      setHealth(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { health, loading };
}
