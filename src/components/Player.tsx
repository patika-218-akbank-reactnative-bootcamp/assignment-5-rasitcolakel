import { Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@src/store';
import { setPlaying } from '@src/store/slices/player';
import { likeTrack } from '@src/store/slices/user';
import { PlaylistStyles as styles } from '@src/styles/Player.style';
import { hexToRGB, isDetailScreen } from '@src/utils/utils';
import { AVPlaybackStatusSuccess, Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomText from './CustomText';

const Player = () => {
  const [seconds, setSeconds] = React.useState({
    current: 0,
    total: 0,
  });
  const [duration, setDuration] = React.useState(0);

  const [isGrid, setIsGrid] = React.useState<boolean>(true);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const colors = useAppSelector((state) => state.theme.colors);
  const themeName = useAppSelector((state) => state.theme.name);
  const { playingTrack, playing, downloading, uri, height, routeName } = useAppSelector(
    (state) => state.player,
  );
  const likedTracks = useAppSelector((state) => state.user.user.likedTracks);

  const isLiked =
    likedTracks && playingTrack && likedTracks.find((track) => track.id === playingTrack.id);

  const [sound, setSound] = React.useState<Sound>();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({
      uri,
    });
    setSound(sound);

    sound?.getStatusAsync().then((status: AVPlaybackStatusSuccess) => {
      setDuration(status.playableDurationMillis);
    });
    await sound.playAsync();
  }

  async function pauseSound() {
    console.log('Pausing Sound');
    player.value = withTiming(0, { duration: 1000 });
    // we need to check if the sound is loaded before pausing it
    if (sound._loaded) {
      await sound.pauseAsync();
    }
  }

  useEffect(() => {
    if (!sound) {
      return;
    }
    return sound
      ? () => {
          console.log('Unloading Sound');
          if (sound) {
            sound.unloadAsync();
          }
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    console.log('playing', playing, sound);
    if (playing) {
      playSound();
    } else {
      if (!sound) {
        return;
      }
      pauseSound();
    }
  }, [playing]);

  useEffect(() => {
    cancelAnimation(player);
    if (!playingTrack || duration === 0) {
      player.value = withTiming(0, { duration: 1000 });
      return;
    }
    setSeconds({
      current: 0,
      total: Math.ceil(duration / 1000),
    });
    player.value = withTiming(0, { duration: 1000 }, () => {
      player.value = withTiming(100, { duration });
    });
    const intervalId = setInterval(() => {
      setSeconds((prev) => ({
        ...prev,
        current: prev.current + 1,
      }));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [playing, playingTrack, duration]);

  const isInsideBottomTabs = !isDetailScreen(routeName);

  const onTrackActivity = () => {
    if (sound) {
      if (playing) {
        pauseSound();
      } else {
        playSound();
      }
    }
    dispatch(setPlaying(!playing));
  };

  const offset = useSharedValue(-1);
  const player = useSharedValue(3);
  console.log('Player Value', player.value);

  const handleLike = () => {
    dispatch(likeTrack(playingTrack));
  };

  const playerStyle = useAnimatedStyle(() => {
    return {
      width: player.value + '%',
    };
  });

  const renderPlayerFullScreen = () => (
    <View
      style={[
        styles.fullScreenPlayerContainer,
        {
          top: insets.top,
          marginBottom: insets.bottom,
          paddingHorizontal: 20,
        },
      ]}>
      <View style={styles.fullScreenHeader}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            offset.value = withTiming(
              -1,
              {
                duration: 300,
              },
              /**
               * It will be called when the animation is finished 🏁
               */
              () => {
                setIsGrid(true);
              },
            );
          }}>
          <MaterialCommunityIcons name="chevron-down" size={34} color={colors.primary} />
        </TouchableOpacity>

        <CustomText
          style={[
            {
              color: colors.white,
            },
            styles.fullScreenHeaderTitle,
          ]}
          title=""
        />
      </View>
      <View style={styles.fullScreenPlayerImageContainer}>
        <Image
          style={[styles.fullScreenPlayerImage]}
          uri={playingTrack.album.cover_xl}
          preview={{
            uri: playingTrack.album.cover_xl,
          }}
        />
      </View>
      <View style={styles.trackDetailContainer}>
        <View style={[styles.trackDetailItem, { paddingBottom: 20 }]}>
          {!downloading ? (
            <Foundation
              name={playing ? 'pause' : 'play'}
              size={45}
              color="#1DB954"
              onPress={onTrackActivity}
            />
          ) : (
            <ActivityIndicator size="small" color={colors.primary} style={styles.trackItemIcon} />
          )}
        </View>
      </View>
      <View style={styles.trackDetailContainer}>
        <View style={styles.trackDetailItem}>
          <View style={[styles.columnedContainer]}>
            <CustomText
              title={playingTrack.title}
              style={{
                paddingBottom: 10,
              }}
              size="large"
            />
            <CustomText title={playingTrack.artist.name} variant="secondary" />
          </View>
          <View>
            <MaterialCommunityIcons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={35}
              color="#1DB954"
              onPress={handleLike}
            />
          </View>
        </View>
      </View>
      <View style={styles.trackDetailItem}>
        <View style={[styles.durationContainer]}>
          <View
            style={{
              height: 7,
              backgroundColor: colors.white,
              borderRadius: 5,
            }}>
            <Animated.View
              style={[
                {
                  height: 7,
                  backgroundColor: colors.primary,
                  borderRadius: 5,
                  alignItems: 'flex-end',
                },
                playerStyle,
              ]}>
              <View
                style={[
                  {
                    height: 15,
                    width: 15,
                    backgroundColor: colors.primary,
                    borderRadius: 15,
                    bottom: 4,
                  },
                ]}
              />
            </Animated.View>
          </View>
        </View>
      </View>
      <View style={styles.trackDetailContainer}>
        <View style={styles.trackDetailItem}>
          <View style={[styles.columnedContainer]}>
            <CustomText title={seconds.current.toString()} variant="secondary" />
          </View>
          <View>
            <CustomText title={seconds.total.toString()} variant="secondary" />
          </View>
        </View>
      </View>
    </View>
  );

  const animatedContainer = useAnimatedStyle(() => {
    if (offset.value >= 0) {
      return {
        bottom: withTiming(0, {
          duration: 100,
        }),
        height: withTiming(Dimensions.get('screen').height, {
          duration: 100,
        }),
        marginBottom: 0,
      };
    }
    return {
      bottom: withTiming(isInsideBottomTabs ? height : 0, {
        duration: 100,
      }),
      height: withTiming(60, {
        duration: 100,
      }),
      paddingBottom: insets.bottom,
    };
  });

  if (!playingTrack) return null;
  return (
    <Animated.ScrollView
      style={[
        {
          position: 'absolute',
          zIndex: 5,
          width: '100%',
          backgroundColor: themeName === 'dark' ? hexToRGB(colors.backgroundColor, 1) : 'white',
        },
        animatedContainer,
      ]}
      onScrollEndDrag={(e) => {
        offset.value = e.nativeEvent.contentOffset.y;
        if (e.nativeEvent.contentOffset.y >= 0) {
          setIsGrid(false);
        } else {
          setIsGrid(true);
        }
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        width: '100%',
      }}>
      {isGrid ? (
        <TouchableOpacity
          onPress={() => {
            offset.value = 10;
            setIsGrid(false);
          }}
          style={[styles.trackItemContainer]}>
          <Image style={styles.tracktItemImage} uri={playingTrack.album.cover} />
          <View style={styles.trackItem}>
            <CustomText title={playingTrack.title} style={styles.trackItemTitle} />
            <CustomText
              title={playingTrack.artist.name}
              style={styles.trackItemTitle}
              variant="secondary"
            />
          </View>
          {!downloading ? (
            <Foundation
              name={playing ? 'pause' : 'play'}
              size={24}
              color="#1DB954"
              style={[
                styles.trackItemIcon,
                {
                  backgroundColor: hexToRGB('#1DB954', 0.3),
                },
              ]}
              onPress={onTrackActivity}
            />
          ) : (
            <ActivityIndicator size="small" color={colors.primary} style={styles.trackItemIcon} />
          )}
        </TouchableOpacity>
      ) : (
        renderPlayerFullScreen()
      )}

      {isGrid && (
        <View
          style={{
            height: 4,
            backgroundColor: colors.white,
          }}>
          <Animated.View
            style={[
              {
                height: 4,
                backgroundColor: colors.primary,
                alignItems: 'flex-end',
              },
              playerStyle,
            ]}
          />
        </View>
      )}
    </Animated.ScrollView>
  );
};

export default Player;
