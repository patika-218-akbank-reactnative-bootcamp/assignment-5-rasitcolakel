import CustomText from '@src/components/CustomText';
import TrackSkeleton from '@src/components/TrackSkeleton';
import { PlaylistDetailStyles as styles } from '@src/styles/PlaylistDetail.style';
import { Artist } from '@src/types/APITypes';
import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  item: Artist | any;
  loading: boolean;
  goToArtist: (artist: Artist) => void;
};
const RenderArtist = ({ item, loading, goToArtist }: Props) => {
  if (loading) {
    return <TrackSkeleton />;
  }

  return (
    <TouchableOpacity style={styles.trackItemContainer} onPress={() => goToArtist(item)}>
      <Image
        style={styles.tracktItemImage}
        uri={`${item.picture_medium}`}
        preview={{
          uri: `${item.picture_small}`,
        }}
      />
      <View style={[styles.trackItem]}>
        <CustomText
          title={item.name}
          style={[
            styles.trackItemTitle,
            {
              top: 13,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default RenderArtist;
