import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import PermissionsScreen from "../screens/onboarding/PermissionsScreen";

import { getItem } from "../utils/storage";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await getItem('hasOnboarded');
      if (value) setHasOnboarded(true);
      setLoading(false);
    };

    checkOnboarding();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasOnboarded ? (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Permissions" component={PermissionsScreen} />
            <Stack.Screen name="MainApp" component={BottomTabs} />
          </>
        ) : (
          <Stack.Screen name="MainApp" component={BottomTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
