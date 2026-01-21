import * as Location from 'expo-location';

export const getUserLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Location permission not granted');
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  return location.coords;
};

export const reverseGeocode = async (latitude, longitude) => {
  const address = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  if (address.length > 0) {
    const place = address[0];
    return `${place.city || place.region}, ${place.country}`;
  }

  return 'Unknown location';
};
