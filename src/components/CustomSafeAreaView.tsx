import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export default function CustomSafeAreaView({ children }: Props) {
  return <SafeAreaView style={[styles.container]}>{children}</SafeAreaView>;
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
