import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomSafeAreaView from '@src/components/CustomSafeAreaView';
import CustomText from '@src/components/CustomText';
import Skeleton from '@src/components/Skeleton';
import RenderTrack from '@src/components/renderTrack';
import { useAppDispatch, useAppSelector } from '@src/store';
import { fetchTracksFromArtist, setArtistTracks } from '@src/store/slices/artists';
import { PlaylistDetailStyles as styles } from '@src/styles/PlaylistDetail.style';
import { Track } from '@src/types/APITypes';
import { searchFromUrl } from '@src/utils/api';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppStackParamsList } from '.';

type Props = NativeStackScreenProps<AppStackParamsList, 'ArtistDetail'>;
const HEIGHT = Dimensions.get('window').width * 0.6;

const ArtistDetailScreen = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const emptyData = Array.from({ length: 30 }, (_, i) => ({
    id: i,
  }));
  const data = useAppSelector((state) => state.artists.artistScreen.data);
  const loading = useAppSelector((state) => state.artists.artistScreen.loading);
  const artist = useAppSelector((state) => state.artists.artistScreen.artist);
  const next = useAppSelector((state) => state.artists.artistScreen.next);
  const colors = useAppSelector((state) => state.theme.colors);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const { artist } = route.params;
    dispatch(fetchTracksFromArtist(artist));
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
  const loadMore = async () => {
    if (!next) {
      return;
    }
    const newTracks = await searchFromUrl<Track>(next);
    dispatch(setArtistTracks(newTracks));
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
            {(artist || !loading) && (
              <Animated.Text
                style={[styles.headerText, animatedTextStyles, { color: colors.text }]}
                numberOfLines={1}>
                {artist.name}
              </Animated.Text>
            )}
          </View>
          <Animated.View style={[styles.imageAnimationStyle, animatedImageStyles]}>
            {!artist ? (
              <Skeleton variant="rect" style={styles.image} />
            ) : (
              <Image
                uri={artist.picture_xl}
                style={styles.image}
                preview={{ uri: artist.picture_small }}
              />
            )}
          </Animated.View>
        </View>
        <FlatList
          ListHeaderComponent={
            artist || !loading ? (
              <View style={styles.listHeaderContainer}>
                <View style={styles.listHeaderItem}>
                  <CustomText title={`${artist.name}`} variant="secondary" />
                </View>
              </View>
            ) : (
              <View style={styles.listHeaderContainer}>
                <View style={styles.listHeaderItem}>
                  <Skeleton variant="rect" style={styles.skeletonText} />
                </View>
              </View>
            )
          }
          data={(loading && data === undefined) || artist === null ? emptyData : data}
          renderItem={({ item }) => <RenderTrack item={item} loading={loading} />}
          keyExtractor={(item) => (item.id || item).toString()}
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={10}
          onScroll={onScroll}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          onEndReached={loadMore}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 20,
          }}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default ArtistDetailScreen;
