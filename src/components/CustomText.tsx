import { useAppSelector } from '@src/store';
import React from 'react';
import { Text, TextProps } from 'react-native';

export type CustomTextProps = TextProps & {
  title: string;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large' | 'xlarge' | number;
  bold?: boolean;
};

const CustomText = (props: CustomTextProps) => {
  const { colors } = useAppSelector((state) => state.theme);
  const styles: any[] = [];
  if (props.variant === 'primary') {
    styles.push({ color: colors.primary });
  } else if (props.variant === 'secondary') {
    styles.push({ color: colors.secondaryText });
  } else {
    styles.push({ color: colors.text });
  }
  if (typeof props.size === 'number') {
    styles.push({ fontSize: props.size });
  } else if (props.size === 'small') {
    styles.push({ fontSize: 12 });
  } else if (props.size === 'medium') {
    styles.push({ fontSize: 16 });
  } else if (props.size === 'large') {
    styles.push({ fontSize: 18 });
  } else if (props.size === 'xlarge') {
    styles.push({ fontSize: 20 });
  } else {
    styles.push({ fontSize: 14 });
  }
  if (props.bold) {
    styles.push({ fontWeight: 'bold' });
  }

  if (props.style) {
    styles.push(props.style);
  }

  return (
    <Text {...props} style={styles}>
      {props.title}
    </Text>
  );
};

export default CustomText;
