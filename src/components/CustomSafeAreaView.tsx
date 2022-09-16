import { useAppSelector } from '@src/store';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export default function CustomSafeAreaView({ children }: Props) {
  const height = useAppSelector((state) => state.player.height);
  const routeName = useAppSelector((state) => state.player.routeName);
  const playing = useAppSelector((state) => state.player.playing);
  const marginBottom = playing ? (routeName === 'PlaylistDetail' ? height + 50 : height) - 10 : 0;
  return <SafeAreaView style={[styles.container, { marginBottom }]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
