import { useAppSelector } from '@src/store';
import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps } from 'react-native';

type SkeletonProps = ViewProps & {
  width?: number | string;
  height?: number;
  variant: 'rect' | 'circle';
  rounded?: number;
  children?: React.ReactNode;
};

const Skeleton: React.FC<SkeletonProps> = ({ children, variant, rounded, ...props }) => {
  const { colors } = useAppSelector((state) => state.theme);
  let borderRadius = 0;
  if (variant === 'circle') {
    borderRadius = 2;
  } else if (rounded) {
    borderRadius = rounded;
  }
  const opacity = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),

        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);
  return (
    <Animated.View
      {...props}
      style={[
        {
          opacity,

          marginVertical: 2.5,
          borderRadius,
          //transform: [{ scale }],
        },
        {
          backgroundColor: colors.backgroundColor,
        },
        props.style ? props.style : {},
      ]}>
      {children}
    </Animated.View>
  );
};

export default Skeleton;
