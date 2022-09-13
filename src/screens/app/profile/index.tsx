import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreenParamsList } from '@src/screens/app';
import EditProfileScreen from '@src/screens/app/profile/EditProfileScreen';
import ProfileScreen from '@src/screens/app/profile/ProfileScreen';
import SettingsSecreen from '@src/screens/app/profile/SettingsSecreen';
import React from 'react';

import ProfileDetailsScreen from './ProfileDetailsScreen';

const Stack = createStackNavigator<ProfileScreenParamsList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen name="Settings" component={SettingsSecreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
