/* eslint-disable react-hooks/exhaustive-deps */
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from '@src/screens/app/BottomTabs';
import { setGenres } from '@src/store/slices/genres';
import { setPlaylists } from '@src/store/slices/playlists';
import { setTracks } from '@src/store/slices/tracks';
import { Playlist, Track } from '@src/types/APITypes';
import { getGenres, search } from '@src/utils/api';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
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
      const data = await search<Playlist>({
        type: 'playlist',
      });
      console.log('data', data);
      dispatch(setPlaylists(data));
    } catch (error: any) {
      console.log('e', error);
    }
  };
  const initTracks = async () => {
    try {
      const data = await search<Track>({
        type: 'track',
      });
      console.log('data', data);
      dispatch(setTracks(data));
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
