/* eslint-disable react-hooks/exhaustive-deps */
import { AntDesign, Foundation, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomText from '@src/components/CustomText';
import { AppStackParamsList } from '@src/screens/app';
import { useAppSelector } from '@src/store';
import { setTracks } from '@src/store/slices/tracks';
import { HomeStyles as styles } from '@src/styles/Home.style';
import { Track } from '@src/types/APITypes';
import { searchFromUrl } from '@src/utils/api';
import { hexToRGB } from '@src/utils/utils';
import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

type Props = NativeStackScreenProps<AppStackParamsList, 'BottomTabs'>;

export default function HomeScreen({ navigation }: Props) {
  const { next, data } = useAppSelector((state) => state.tracks);
  const colors = useAppSelector((state) => state.theme.colors);
  const dispatch = useDispatch();
  const renderItem = ({ item }: { item: Track }) => (
    <View style={styles.trackItemContainer}>
      <Image style={styles.tracktItemImage} uri={`${item.album.cover}`} />
      <View style={styles.trackItem}>
        <CustomText title={item.title} style={styles.trackItemTitle} />
        <CustomText title={item.artist.name} style={styles.trackItemTitle} variant="secondary" />
      </View>
      <Foundation
        name="play"
        size={24}
        color={colors.primary}
        style={{
          backgroundColor: hexToRGB(colors.primary, 0.2),
          padding: 5,
          paddingHorizontal: 10,
          borderRadius: 100,
        }}
      />
    </View>
  );

  const loadMore = async () => {
    const newTracks = await searchFromUrl<Track>(next);
    dispatch(setTracks(newTracks));
  };
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <CustomText title="Playlists" size="xlarge" bold style={styles.title} />
            <PlaylistSection />
            <CustomText title="New Releases" size="xlarge" bold style={styles.title} />
          </>
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => loadMore()}
      />
    </View>
  );
}

const PlaylistSection = () => {
  const playlists = useAppSelector((state) => state.playlists.data).slice(0, 6);
  const { colors, name } = useAppSelector((state) => state.theme);

  return (
    <View style={[styles.playlistContainer]}>
      {playlists.map((item) => (
        <View key={item.id} style={styles.playlistItemContainer}>
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
        </View>
      ))}
    </View>
  );
};