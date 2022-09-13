import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomText from '@src/components/CustomText';
import React from 'react';
import { View } from 'react-native';

import { AppStackParamsList } from '.';

type Props = NativeStackScreenProps<AppStackParamsList, 'BottomTabs'>;

export default function SearchScreen({ navigation }: Props) {
  return (
    <View>
      <CustomText title="Search" />
    </View>
  );
}
