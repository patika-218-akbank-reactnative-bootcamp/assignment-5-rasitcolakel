/* eslint-disable react-hooks/exhaustive-deps */
import Skeleton from '@src/components/Skeleton';
import { useAppSelector } from '@src/store';
import { HomeStyles as styles } from '@src/styles/Home.style';
import { hexToRGB } from '@src/utils/utils';
import React from 'react';
import { View } from 'react-native';

const TrackSkeleton = () => {
  const colors = useAppSelector((state) => state.theme.colors);
  return (
    <View style={[styles.playlistItemContainer]}>
      <Skeleton style={[styles.playlistItem]} variant="rect">
        <Skeleton
          variant="rect"
          style={[
            styles.tracktItemImage,
            {
              backgroundColor: hexToRGB(colors.secondaryText),
            },
          ]}
        />
        <View style={[styles.trackItem]}>
          <Skeleton
            variant="rect"
            style={[
              styles.trackItemTitle,
              {
                backgroundColor: hexToRGB(colors.secondaryText, 0.8),
              },
            ]}
          />
          <Skeleton
            variant="rect"
            style={[
              styles.trackItemTitle,
              {
                backgroundColor: hexToRGB(colors.secondaryText, 0.5),
              },
            ]}
          />
        </View>
        <Skeleton
          variant="rect"
          style={[
            styles.tracktItemImage,
            styles.trackItemIcon,
            {
              backgroundColor: hexToRGB(colors.secondaryText, 0.2),
            },
          ]}
        />
      </Skeleton>
    </View>
  );
};

export default TrackSkeleton;
