import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import PermissionsScreen from "../screens/onboarding/PermissionsScreen";
import LoginScreen from '../screens/auth/LoginScreen';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import ErrorBoundary from '../components/common/ErrorBoundary';

import { getItem } from "../utils/storage";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <AuthProvider>
      <InnerNavigator />
    </AuthProvider>
  );
}

function InnerNavigator() {
  const [loading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const { auth, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await getItem('hasOnboarded');
      if (value) setHasOnboarded(true);
      setLoading(false);
    };

    checkOnboarding();
  }, []);

  if (loading || authLoading) return null;

  const initialRoute = !hasOnboarded ? 'Onboarding' : (!auth?.isAuthenticated ? 'Login' : 'MainApp');

  return (
    <NavigationContainer>
      <ErrorBoundary>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Permissions" component={PermissionsScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainApp" component={BottomTabs} />
        </Stack.Navigator>
      </ErrorBoundary>
    </NavigationContainer>
  );
}
