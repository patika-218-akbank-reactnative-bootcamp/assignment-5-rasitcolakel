/* eslint-disable react-hooks/exhaustive-deps */
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomText from '@src/components/CustomText';
import PlaylistSkeleton from '@src/components/PlaylistSkeleton';
import RenderTrack from '@src/components/renderTrack';
import { AppStackParamsList } from '@src/screens/app';
import { useAppSelector } from '@src/store';
import { setHeight } from '@src/store/slices/player';
import { setTracks } from '@src/store/slices/tracks';
import { HomeStyles as styles } from '@src/styles/Home.style';
import { Playlist, Track } from '@src/types/APITypes';
import { searchFromUrl } from '@src/utils/api';
import { hexToRGB } from '@src/utils/utils';
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

type Props = NativeStackScreenProps<AppStackParamsList, 'BottomTabs'>;

export default function HomeScreen({ navigation }: Props) {
  const bottomTabsHeight = useBottomTabBarHeight();

  const { next, data, loading } = useAppSelector((state) => state.tracks);
  const emptyData = Array.from({ length: 30 }, (_, i) => ({
    id: i,
  }));
  const dispatch = useDispatch();

  const loadMore = async () => {
    if (!next) {
      return;
    }
    const newTracks = await searchFromUrl<Track>(next);
    dispatch(setTracks(newTracks));
  };

  const goToPlaylist = (playlist: Playlist) => {
    navigation.navigate('PlaylistDetail', { playlist });
  };

  useEffect(() => {
    dispatch(setHeight(bottomTabsHeight));
  }, [bottomTabsHeight]);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <CustomText title="Playlists" size="xlarge" bold style={styles.title} />
            <PlaylistSection goToPlaylist={goToPlaylist} />
            <CustomText title="New Releases" size="xlarge" bold style={styles.title} />
          </>
        }
        data={loading ? emptyData : data}
        renderItem={({ item }) => <RenderTrack item={item} loading={loading} />}
        keyExtractor={(item) => (item.id || item).toString()}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => loadMore()}
      />
    </View>
  );
}

type PlaylistSectionProps = {
  goToPlaylist: (playlist: Playlist) => void;
};

const PlaylistSection = ({ goToPlaylist }: PlaylistSectionProps) => {
  const playlists = useAppSelector((state) => state.playlists.data).slice(0, 6);
  const emptyData = Array.from({ length: 6 }, (_, i) => i);
  const loading = useAppSelector((state) => state.playlists.loading);
  const { colors, name } = useAppSelector((state) => state.theme);
  return (
    <View style={[styles.playlistContainer]}>
      {loading
        ? emptyData.map((item) => <PlaylistSkeleton key={item} />)
        : playlists.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.playlistItemContainer]}
              onPress={() => goToPlaylist(item)}>
              <View
                style={[
                  styles.playlistItem,
                  {
                    backgroundColor: hexToRGB(
                      name === 'dark' ? colors.backgroundColor : colors.primary,
                      0.9,
                    ),
                  },
                ]}>
                <Image style={styles.playlistItemImage} uri={`${item.picture}`} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <CustomText
                    size="small"
                    title={item.title}
                    style={[styles.playlistItemTitle, { color: colors.white }]}
                  />
                </ScrollView>
              </View>
            </TouchableOpacity>
          ))}
    </View>
  );
};
