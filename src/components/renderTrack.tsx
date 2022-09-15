import { Foundation } from '@expo/vector-icons';
import CustomText from '@src/components/CustomText';
import TrackSkeleton from '@src/components/TrackSkeleton';
import { useAppSelector } from '@src/store';
import { PlaylistDetailStyles as styles } from '@src/styles/PlaylistDetail.style';
import { Track } from '@src/types/APITypes';
import { hexToRGB } from '@src/utils/utils';
import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

const renderTrack = ({ item }: { item: Track | any }) => {
  if (typeof item === 'number') return <TrackSkeleton />;
  return (
    <View style={styles.trackItemContainer}>
      <Image style={styles.tracktItemImage} uri={`${item.album.cover}`} />
      <View style={styles.trackItem}>
        <CustomText title={item.title} style={styles.trackItemTitle} />
        <CustomText title={item.artist.name} style={styles.trackItemTitle} variant="secondary" />
      </View>
      <Foundation
        name="play"
        size={24}
        color="#1DB954"
        style={[
          styles.trackItemIcon,
          {
            backgroundColor: hexToRGB('#1DB954', 0.3),
          },
        ]}
      />
    </View>
  );
};

export default renderTrack;
