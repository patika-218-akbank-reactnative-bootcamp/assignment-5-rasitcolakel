import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomSafeAreaView from '@src/components/CustomSafeAreaView';
import CustomText from '@src/components/CustomText';
import RenderTrack from '@src/components/renderTrack';
import { useAppSelector } from '@src/store';
import { ProfileScreenStyle as styles } from '@src/styles/Profile.style';
import React from 'react';
import { FlatList, Image, View } from 'react-native';

import { ProfileScreenParamsList } from '..';

type Props = NativeStackScreenProps<ProfileScreenParamsList, 'Profile'>;
const ProfileScreen = ({ navigation }: Props) => {
  const { name, colors } = useAppSelector((state) => state.theme);
  const user = useAppSelector((state) => state.user.user);
  const defaultImage =
    name === 'dark'
      ? require('../../../assets/user-dark.png')
      : require('../../../assets/user-light.png');
  return (
    <CustomSafeAreaView>
      <View style={styles.headerContainer}>
        <Image style={styles.image} source={defaultImage} />
        <CustomText title={user.displayName} size="large" />
        <Feather
          onPress={() => navigation.push('ProfileDetails')}
          name="settings"
          size={24}
          color="white"
          style={[styles.icon, { color: colors.primary }]}
        />
      </View>
      <CustomText title="Liked Tracks" size="large" style={styles.title} />
      <FlatList
        data={user.likedTracks}
        renderItem={({ item }) => <RenderTrack item={item} loading={false} />}
        keyExtractor={(item) => (item.id || item).toString()}
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={10}
      />
    </CustomSafeAreaView>
  );
};

export default ProfileScreen;
