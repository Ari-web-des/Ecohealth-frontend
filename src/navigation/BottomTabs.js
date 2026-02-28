import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/home/HomeScreen';
import ClimateScreen from '../screens/climate/ClimateScreen';
import HealthScreen from '../screens/health/HealthScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import CommunityScreen from '../screens/community/CommunityScreen';

import theme from '../constants/theme';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Climate':
              iconName = 'earth-outline';
              break;
            case 'Health':
              iconName = 'heart-outline';
              break;
            case 'Community':
              iconName = 'megaphone-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Climate" component={ClimateScreen} />
      <Tab.Screen name="Health" component={HealthScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
    </Tab.Navigator>
  );
}
