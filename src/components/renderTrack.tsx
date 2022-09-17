import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomText from '@src/components/CustomText';
import TrackSkeleton from '@src/components/TrackSkeleton';
import { useAppDispatch, useAppSelector } from '@src/store';
import { playTrack, stopTrack } from '@src/store/slices/player';
import { likeTrack } from '@src/store/slices/user';
import { PlaylistDetailStyles as styles } from '@src/styles/PlaylistDetail.style';
import { Track } from '@src/types/APITypes';
import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  item: Track | any;
  loading: boolean;
};
const RenderTrack = ({ item, loading }: Props) => {
  const playingTrack = useAppSelector((state) => state.player.playingTrack);
  const playing = useAppSelector((state) => state.player.playing);
  const likedTracks = useAppSelector((state) => state.user.user.likedTracks);
  const dispatch = useAppDispatch();
  if (loading) {
    return <TrackSkeleton />;
  }

  const isLiked = likedTracks && likedTracks.find((track) => track.id === item.id);

  const handleLike = () => {
    dispatch(likeTrack(item));
  };

  const handlePlay = () => {
    if (playingTrack?.id === item.id) {
      if (playing) {
        dispatch(stopTrack());
      } else {
        dispatch(playTrack(item));
      }
    } else {
      dispatch(playTrack(item));
    }
  };

  return (
    <TouchableOpacity style={styles.trackItemContainer} onLongPress={handlePlay}>
      <Image style={styles.tracktItemImage} uri={`${item.album.cover}`} />
      <View style={styles.trackItem}>
        <CustomText title={item.title} style={styles.trackItemTitle} />
        <CustomText title={item.artist.name} style={styles.trackItemTitle} variant="secondary" />
      </View>
      <TouchableOpacity style={styles.trackItemIcon} onPress={handleLike}>
        <MaterialCommunityIcons
          name={isLiked ? 'heart' : 'heart-outline'}
          size={30}
          color="#1DB954"
          style={[styles.trackItemIcon]}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.trackItemIcon} onPress={handlePlay}>
        <MaterialCommunityIcons
          name={playingTrack?.id === item.id ? (playing ? 'pause' : 'play') : 'play'}
          size={30}
          color="#1DB954"
          style={[styles.trackItemIcon]}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default RenderTrack;
