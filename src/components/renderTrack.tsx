import { Foundation } from '@expo/vector-icons';
import CustomText from '@src/components/CustomText';
import TrackSkeleton from '@src/components/TrackSkeleton';
import { useAppDispatch, useAppSelector } from '@src/store';
import { playTrack, stopTrack } from '@src/store/slices/player';
import { PlaylistDetailStyles as styles } from '@src/styles/PlaylistDetail.style';
import { Track } from '@src/types/APITypes';
import { hexToRGB } from '@src/utils/utils';
import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

type Props = {
  item: Track | any;
  loading: boolean;
};
const RenderTrack = ({ item, loading }: Props) => {
  const playingTrack = useAppSelector((state) => state.player.playingTrack);
  const playing = useAppSelector((state) => state.player.playing);
  const dispatch = useAppDispatch();
  if (loading) {
    return <TrackSkeleton />;
  }

  return (
    <View style={styles.trackItemContainer}>
      <Image style={styles.tracktItemImage} uri={`${item.album.cover}`} />
      <View style={styles.trackItem}>
        <CustomText title={item.title} style={styles.trackItemTitle} />
        <CustomText title={item.artist.name} style={styles.trackItemTitle} variant="secondary" />
      </View>
      <Foundation
        name={playingTrack?.id === item.id ? (playing ? 'pause' : 'play') : 'play'}
        size={34}
        color="#1DB954"
        style={[styles.trackItemIcon]}
        onPress={() => {
          if (playingTrack?.id === item.id) {
            if (playing) {
              dispatch(stopTrack());
            } else {
              dispatch(playTrack(item));
            }
          } else {
            dispatch(playTrack(item));
          }
        }}
      />
    </View>
  );
};

export default RenderTrack;
