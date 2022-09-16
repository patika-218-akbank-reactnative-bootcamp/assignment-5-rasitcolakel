import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomSafeAreaView from '@src/components/CustomSafeAreaView';
import CustomText from '@src/components/CustomText';
import Skeleton from '@src/components/Skeleton';
import RenderTrack from '@src/components/renderTrack';
import { useAppDispatch, useAppSelector } from '@src/store';
import { getPlaylist } from '@src/store/slices/playlists';
import { PlaylistDetailStyles as styles } from '@src/styles/PlaylistDetail.style';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { AppStackParamsList } from '.';

type Props = NativeStackScreenProps<AppStackParamsList, 'PlaylistDetail'>;
const HEIGHT = Dimensions.get('window').width * 0.6;

const secToHourString = (min: number) => {
  const hours = Math.floor(min / 60 / 60);
  const minutes = min % 60;
  return `${hours}h ${minutes}m`;
};

const PlaylistDetailScreen = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const emptyData = Array.from({ length: 30 }, (_, i) => ({
    id: i,
  }));
  const data = useAppSelector((state) => state.playlists.playlistScreen.playlist?.tracks.data);
  const loading = useAppSelector((state) => state.playlists.playlistScreen.loading);
  const playlist = useAppSelector((state) => state.playlists.playlistScreen.playlist);
  const colors = useAppSelector((state) => state.theme.colors);

  useEffect(() => {
    const { playlist } = route.params;
    dispatch(getPlaylist(playlist.id));
  }, []);

  const offset = useSharedValue(0);

  const animatedImageStyles = useAnimatedStyle(() => {
    return {
      height: HEIGHT - offset.value,
      width: HEIGHT - offset.value,
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      opacity: 0 + offset.value / HEIGHT,
    };
  });

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y < HEIGHT) {
      if (e.nativeEvent.contentOffset.y < 0) {
        offset.value = 0;
      } else {
        offset.value = e.nativeEvent.contentOffset.y;
      }
    } else if (e.nativeEvent.contentOffset.y >= HEIGHT) {
      offset.value = HEIGHT;
    } else {
      offset.value = 0;
    }
  };

  return (
    <CustomSafeAreaView>
      <View>
        <View style={styles.headerContainer}>
          <View
            style={[
              styles.headerContainerView,
              {
                height: HEIGHT / 4,
              },
            ]}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={34}
              color={colors.primary}
              onPress={() => navigation.goBack()}
            />
            {(playlist || !loading) && (
              <Animated.Text
                style={[styles.headerText, animatedTextStyles, { color: colors.text }]}
                numberOfLines={1}>
                {playlist.title}
              </Animated.Text>
            )}
          </View>
          <Animated.View style={[styles.imageAnimationStyle, animatedImageStyles]}>
            {!playlist ? (
              <Skeleton variant="rect" style={styles.image} />
            ) : (
              <Image
                uri={playlist.picture_xl}
                style={styles.image}
                preview={{ uri: playlist.picture_small }}
              />
            )}
          </Animated.View>
        </View>
        <FlatList
          ListHeaderComponent={
            playlist || !loading ? (
              <View style={styles.listHeaderContainer}>
                <View style={styles.listHeaderItem}>
                  <CustomText title={`${playlist.description}`} variant="secondary" />
                </View>
                <View style={styles.listHeaderItem}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color={colors.secondaryText}
                    style={styles.listHeaderItemIcon}
                  />
                  <CustomText title={`${playlist.fans} likes`} variant="secondary" />
                </View>
                <View style={styles.listHeaderItem}>
                  <MaterialCommunityIcons
                    name="music-note-outline"
                    size={24}
                    color={colors.secondaryText}
                    style={styles.listHeaderItemIcon}
                  />
                  <CustomText title={`${playlist.nb_tracks} tracks`} variant="secondary" />
                </View>
                <View style={styles.listHeaderItem}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={24}
                    color={colors.secondaryText}
                    style={styles.listHeaderItemIcon}
                  />
                  <CustomText title={secToHourString(playlist.duration)} variant="secondary" />
                </View>
              </View>
            ) : (
              <View style={styles.listHeaderContainer}>
                <View style={styles.listHeaderItem}>
                  <Skeleton variant="rect" style={styles.skeletonText} />
                </View>
                <View style={styles.listHeaderItem}>
                  <Skeleton variant="rect" style={styles.skeletonText} />
                </View>
                <View style={styles.listHeaderItem}>
                  <Skeleton variant="rect" style={styles.skeletonText} />
                </View>
              </View>
            )
          }
          data={(loading && data === undefined) || playlist === null ? emptyData : data}
          renderItem={({ item }) => <RenderTrack item={item} loading={loading} />}
          keyExtractor={(item) => (item.id || item).toString()}
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default PlaylistDetailScreen;
