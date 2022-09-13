import { useAppSelector } from '@src/store';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingIndicator = () => {
  const { loading, colors } = useAppSelector((state) => state.theme);
  if (!loading) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
  },
});
