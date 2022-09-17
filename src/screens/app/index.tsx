/* eslint-disable react-hooks/exhaustive-deps */
import { NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Player from '@src/components/Player';
import BottomTabs from '@src/screens/app/BottomTabs';
import { useAppDispatch } from '@src/store';
import { setGenres } from '@src/store/slices/genres';
import { fetchPlaylists } from '@src/store/slices/playlists';
import { fetchTracks } from '@src/store/slices/tracks';
import { UserState, fetchLikedTracks, setUser } from '@src/store/slices/user';
import { Artist, Genre, Playlist } from '@src/types/APITypes';
import { getGenres } from '@src/utils/api';
import { auth } from '@src/utils/firebase';
import React, { useEffect } from 'react';

import ArtistDetailScreen from './ArtistDetailScreen';
import GenreDetailScreen from './GenreDetailScreen';
import PlaylistDetailScreen from './PlaylistDetailScreen';

export type AppStackParamsList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  PlaylistDetail: { playlist: Playlist } | undefined;
  GenreDetail: { genre: Genre } | undefined;
  ArtistDetail: { artist: Artist } | undefined;
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

  const initLikedTracks = async () => {
    try {
      dispatch(fetchLikedTracks());
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

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      if (user) {
        const userData: UserState = {
          user: {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
          },
          accessToken: user.refreshToken,
        };
        initLikedTracks();
        dispatch(setUser(userData));
      }
    });
    return subscriber;
  }, []);

  return (
    <>
      <Player />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
        <Stack.Screen name="GenreDetail" component={GenreDetailScreen} />
        <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AppStack;
