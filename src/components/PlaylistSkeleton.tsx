/* eslint-disable react-hooks/exhaustive-deps */
import Skeleton from '@src/components/Skeleton';
import { useAppSelector } from '@src/store';
import { HomeStyles as styles } from '@src/styles/Home.style';
import { hexToRGB } from '@src/utils/utils';
import React from 'react';
import { View } from 'react-native';

const PlaylistSkeleton = () => {
  const colors = useAppSelector((state) => state.theme.colors);
  return (
    <View style={[styles.playlistItemContainer]}>
      <Skeleton style={[styles.playlistItem]} variant="rect">
        <Skeleton
          variant="rect"
          style={[
            styles.playlistItemImage,
            {
              backgroundColor: hexToRGB(colors.secondaryText),
            },
          ]}
        />
        <View style={[styles.trackItem]}>
          <Skeleton
            variant="rect"
            style={[
              styles.playlistItemTitle,
              {
                backgroundColor: hexToRGB(colors.secondaryText, 0.5),
              },
            ]}
          />
          <Skeleton
            variant="rect"
            style={[
              styles.playlistItemTitle,
              {
                backgroundColor: hexToRGB(colors.secondaryText, 0.5),
              },
            ]}
          />
        </View>
      </Skeleton>
    </View>
  );
};

export default PlaylistSkeleton;
