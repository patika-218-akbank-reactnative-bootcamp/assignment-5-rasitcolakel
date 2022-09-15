import { AntDesign, Foundation } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomInput from '@src/components/CustomInput';
import CustomSafeAreaView from '@src/components/CustomSafeAreaView';
import CustomText from '@src/components/CustomText';
import TrackSkeleton from '@src/components/TrackSkeleton';
import renderTrack from '@src/components/renderTrack';
import { useAppDispatch, useAppSelector } from '@src/store';
import {
  clearSearch,
  postSearch,
  setIsSearching,
  setSearch,
  setTracks,
} from '@src/store/slices/search';
import { SearchScreenStyle as styles } from '@src/styles/Search.style';
import { Album, Artist, Track } from '@src/types/APITypes';
import { searchFromUrl } from '@src/utils/api';
import { hexToRGB } from '@src/utils/utils';
import React, { useLayoutEffect, useRef } from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import { AppStackParamsList } from '.';

type Props = NativeStackScreenProps<AppStackParamsList, 'BottomTabs'>;

export default function SearchScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const inputRef = useRef(null);
  const timeout = useRef(null);

  const search = useAppSelector((state) => state.search.search);
  const isSearching = useAppSelector((state) => state.search.isSearching);
  const colors = useAppSelector((state) => state.theme.colors);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: !isSearching });
  }, [isSearching]);

  const toogleSearching = (value: boolean) => {
    dispatch(setIsSearching(value));
  };

  const hangleChange = (value: string) => {
    clearTimeout(timeout.current);
    dispatch(setSearch(value));
    timeout.current = setTimeout(() => {
      dispatch(postSearch(value));
    }, 400);
  };

  const iconOnPress = () => {
    if (isSearching) {
      hangleChange('');
    }
    toogleSearching(!isSearching);
    inputRef.current?.blur();
  };

  const clear = () => {
    dispatch(clearSearch());
  };
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <CustomInput
            ref={inputRef}
            placeholder="Search"
            value={search}
            onFocus={() => toogleSearching(true)}
            onChangeText={(text: string) => {
              hangleChange(text);
            }}
            icon={
              <AntDesign
                name={isSearching ? 'close' : 'search1'}
                size={25}
                style={[styles.icon]}
                color={search.length ? colors.secondaryText : 'transparent'}
                onPress={clear}
              />
            }
            returnKeyType="search"
          />
          {isSearching && (
            <CustomText title="Cancel" style={styles.inputContainerCancel} onPress={iconOnPress} />
          )}
        </View>
        <SearchView />
        <GenreView />
      </View>
    </CustomSafeAreaView>
  );
}

const SearchView = () => {
  const colors = useAppSelector((state) => state.theme.colors);
  const { isSearching, search, data, next, loading } = useAppSelector((state) => state.search);

  const dispatch = useAppDispatch();
  if (!isSearching) {
    return null;
  }

  if (search.length === 0) {
    return (
      <View style={styles.searchContainer}>
        <AntDesign name="search1" style={styles.searchContainerIcon} color={colors.secondaryText} />
        <CustomText title="Search For A Track" size="xlarge" style={styles.searchContainerText} />
      </View>
    );
  }

  if (!loading && data.length === 0) {
    return (
      <View style={styles.searchContainer}>
        <AntDesign name="frowno" style={styles.searchContainerIcon} color={colors.secondaryText} />
        <CustomText
          title="No data found please change the search params"
          size="xlarge"
          style={styles.searchContainerText}
        />
      </View>
    );
  }
  const loadMore = async () => {
    if (!next) {
      return;
    }
    const newTracks = await searchFromUrl<Track | Album | Artist>(next);
    dispatch(setTracks(newTracks));
  };
  const emptyData = Array.from({ length: 30 }, (_, i) => i);

  return (
    <View style={styles.container}>
      <FlatList
        data={loading ? emptyData : data}
        renderItem={renderTrack}
        keyExtractor={(item) => (item.id || item).toString()}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => loadMore()}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};
const GenreView = () => {
  const genres = useAppSelector((state) => state.genres.data);
  const isSearching = useAppSelector((state) => state.search.isSearching);
  const colors = useAppSelector((state) => state.theme.colors);

  if (isSearching) {
    return null;
  }

  return (
    <ScrollView>
      <View style={styles.genreContainer}>
        {genres.map((item) => (
          <View style={styles.genreItemContainer} key={item.id}>
            <View
              style={[
                styles.genreItem,
                {
                  backgroundColor: colors.backgroundColor,
                },
              ]}>
              <Image style={styles.genreItemImage} uri={`${item.picture_small}`} />
              <CustomText title={item.name} style={styles.genreItemTitle} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
