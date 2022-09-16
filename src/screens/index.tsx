/* eslint-disable react-hooks/exhaustive-deps */
import { DarkTheme, DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import AppStack from '@src/screens/app';
import AuthStack from '@src/screens/auth';
import { useAppSelector } from '@src/store';
import { setRouteName } from '@src/store/slices/player';
import { setTheme } from '@src/store/slices/theme';
import { setUser } from '@src/store/slices/user';
import { ThemeType } from '@src/utils/darkTheme';
import { getActiveRouteName } from '@src/utils/utils';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { useDispatch } from 'react-redux';

export default function Navigation() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const theme = useAppSelector((state) => state.theme);
  const { user, accessToken } = useAppSelector((state) => state.user);
  // this will be called when the app starts and set the user if stored in async storage
  const checkUser = async () => {
    const _user = await SecureStore.getItemAsync('user');
    if (_user) {
      dispatch(setUser(JSON.parse(_user)));
    }
  };

  // this will be called when the app starts and set the theme if stored in async storage
  const checkTheme = async () => {
    const _theme = await SecureStore.getItemAsync('theme');
    if (_theme) {
      dispatch(setTheme(JSON.parse(_theme)));
    } else {
      dispatch(setTheme(colorScheme));
    }
  };

  useEffect(() => {
    try {
      checkUser();
      checkTheme();
    } catch (error) {
      console.log(error);
    }
  }, [colorScheme, dispatch]);

  return (
    <NavigationContainer
      theme={themeBuilder(theme)}
      onStateChange={(state) => {
        const newRouteName = getActiveRouteName(state);
        console.log('newRouteName', newRouteName);
        dispatch(setRouteName(newRouteName));
      }}>
      <StatusBar barStyle={theme.name === 'dark' ? 'light-content' : 'dark-content'} />
      {accessToken && user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

// it will return the theme based on the theme type
const themeBuilder = (theme: ThemeType): Theme => {
  const { name, colors } = theme;
  const navigationTheme = name === 'dark' ? DarkTheme : DefaultTheme;
  const themeColors: Theme = {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      primary: colors.primary,
    },
  };

  return themeColors;
};
