import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomSafeAreaView from '@src/components/CustomSafeAreaView';
import CustomText from '@src/components/CustomText';
import Skeleton from '@src/components/Skeleton';
import RenderArtist from '@src/components/renderArtist';
import { useAppDispatch, useAppSelector } from '@src/store';
import { fetchGenreArtists } from '@src/store/slices/genres';
import { PlaylistDetailStyles as styles } from '@src/styles/PlaylistDetail.style';
import React, { useEffect } from 'react';
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppStackParamsList } from '.';

type Props = NativeStackScreenProps<AppStackParamsList, 'GenreDetail'>;
const HEIGHT = Dimensions.get('window').width * 0.6;

const GenreDetailScreen = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const emptyData = Array.from({ length: 30 }, (_, i) => ({
    id: i,
  }));
  const data = useAppSelector((state) => state.genres.genreScreen.artists);
  const loading = useAppSelector((state) => state.genres.genreScreen.loading);
  const genre = useAppSelector((state) => state.genres.genreScreen.genre);
  const colors = useAppSelector((state) => state.theme.colors);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const { genre } = route.params;
    dispatch(fetchGenreArtists(genre));
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

  const goToArtist = (artist: any) => {
    navigation.navigate('ArtistDetail', { artist });
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
            {(genre || !loading) && (
              <Animated.Text
                style={[styles.headerText, animatedTextStyles, { color: colors.text }]}
                numberOfLines={1}>
                {genre.name}
              </Animated.Text>
            )}
          </View>
          <Animated.View style={[styles.imageAnimationStyle, animatedImageStyles]}>
            {!genre ? (
              <Skeleton variant="rect" style={styles.image} />
            ) : (
              <Image
                uri={genre.picture_xl}
                style={styles.image}
                preview={{ uri: genre.picture_small }}
              />
            )}
          </Animated.View>
        </View>
        <FlatList
          contentContainerStyle={{
            paddingBottom: insets.bottom + 20,
          }}
          ListHeaderComponent={
            !loading ? (
              <View style={styles.listHeaderContainer}>
                <View style={styles.listHeaderItem}>
                  <CustomText title={`${genre.name}`} variant="secondary" size="large" />
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
          data={(loading && data === undefined) || genre === null ? emptyData : data}
          renderItem={({ item }) => (
            <RenderArtist item={item} loading={loading} goToArtist={goToArtist} />
          )}
          keyExtractor={(item) => (item.id || item).toString()}
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={3}
          onScroll={onScroll}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          removeClippedSubviews
          windowSize={10}
        />
      </View>
    </CustomSafeAreaView>
  );
};

export default GenreDetailScreen;
