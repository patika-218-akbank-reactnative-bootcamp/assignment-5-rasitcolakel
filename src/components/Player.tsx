import { Foundation } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@src/store';
import { setPlaying } from '@src/store/slices/player';
import { PlaylistStyles as styles } from '@src/styles/Player.style';
import { hexToRGB } from '@src/utils/utils';
import { Audio } from 'expo-av';
import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomText from './CustomText';

// create a custom animated component

const Player = () => {
  const [isGrid, setIsGrid] = React.useState<boolean>(true);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const colors = useAppSelector((state) => state.theme.colors);
  const { playingTrack, playing, downloading, uri, height, routeName } = useAppSelector(
    (state) => state.player,
  );

  const [sound, setSound] = React.useState<any>();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({
      uri,
    });
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function pauseSound() {
    console.log('Pausing Sound');
    await sound.pauseAsync();
  }

  useEffect(() => {
    if (!sound) {
      return;
    }
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (playing) {
      playSound();
    } else {
      if (!sound) {
        return;
      }
      pauseSound();
    }
  }, [playing]);

  const isInsideBottomTabs = routeName !== 'PlaylistDetail';

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

  const animatedContainer = useAnimatedStyle(() => {
    console.log('offset.value', offset.value);
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

  console.log('setIsGrid', isGrid);
  if (!playingTrack) return null;
  console.log('offset.value');
  return (
    <Animated.ScrollView
      style={[
        {
          position: 'absolute',
          zIndex: 5,
          width: '100%',
          backgroundColor: hexToRGB(colors.backgroundColor),
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
        <Text>13123</Text>
      )}
    </Animated.ScrollView>
  );
};

export default Player;
