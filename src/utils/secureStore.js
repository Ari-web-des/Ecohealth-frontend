import AsyncStorage from '@react-native-async-storage/async-storage';

let SecureStore = null;
try {
  SecureStore = require('expo-secure-store');
} catch (e) {
  SecureStore = null;
}

const TOKEN_KEY = 'ecohealth_token';

export async function setToken(value) {
  if (SecureStore && SecureStore.setItemAsync) {
    return SecureStore.setItemAsync(TOKEN_KEY, value);
  }
  return AsyncStorage.setItem(TOKEN_KEY, value);
}

export async function getToken() {
  if (SecureStore && SecureStore.getItemAsync) {
    return SecureStore.getItemAsync(TOKEN_KEY);
  }
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function deleteToken() {
  if (SecureStore && SecureStore.deleteItemAsync) {
    return SecureStore.deleteItemAsync(TOKEN_KEY);
  }
  return AsyncStorage.removeItem(TOKEN_KEY);
}

export default { setToken, getToken, deleteToken };
