/* eslint-disable react-hooks/exhaustive-deps */
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from '@src/screens/app/BottomTabs';
import { useAppDispatch } from '@src/store';
import { setGenres } from '@src/store/slices/genres';
import { fetchPlaylists } from '@src/store/slices/playlists';
import { fetchTracks, setTracks } from '@src/store/slices/tracks';
import { Track } from '@src/types/APITypes';
import { getGenres, search } from '@src/utils/api';
import React, { useEffect } from 'react';

export type AppStackParamsList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
};

export type BottomTabParamList = {
  Home: undefined;
  ProfileStack: NavigatorScreenParams<ProfileScreenParamsList>;
  Search: undefined;
};

export type ProfileScreenParamsList = {
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
  ProfileDetails: undefined;
};

const Stack = createStackNavigator<AppStackParamsList>();

const AppStack = () => {
  const dispatch = useAppDispatch();
  const initGenres = async () => {
    try {
      const data = await getGenres();
      dispatch(setGenres(data.data));
    } catch (error: any) {
      console.log('e', error);
    }
  };
  const initPlaylists = async () => {
    try {
      dispatch(fetchPlaylists());
    } catch (error: any) {
      console.log('e', error);
    }
  };
  const initTracks = async () => {
    try {
      dispatch(fetchTracks());
    } catch (error: any) {
      console.log('e', error);
    }
  };

  useEffect(() => {
    initGenres();
    initPlaylists();
    initTracks();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default AppStack;
