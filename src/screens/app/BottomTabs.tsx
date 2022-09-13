import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '@src/screens/app';
import HomeScreen from '@src/screens/app/HomeScreen';
import SearchScreen from '@src/screens/app/SearchScreen';
import ProfileStack from '@src/screens/app/profile';
import React from 'react';

const BottomNav = createBottomTabNavigator<BottomTabParamList>();
const BottomTabs = () => {
  return (
    <BottomNav.Navigator>
      <BottomNav.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <BottomNav.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="search-web" size={size} color={color} />
          ),
        }}
      />
      <BottomNav.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </BottomNav.Navigator>
  );
};

export default BottomTabs;
