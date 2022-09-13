import CustomText from '@src/components/CustomText';
import { useAppSelector } from '@src/store';
import { setTheme } from '@src/store/slices/theme';
import { ProfileDetailsScreenStyle as styles } from '@src/styles/ProfileDetails.style';
import { darkTheme } from '@src/utils/darkTheme';
import { lightTheme } from '@src/utils/lightTheme';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { ColorSchemeName, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

const SettingsSecreen = () => {
  const { name, colors } = useAppSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handleThemeChange = async (theme: ColorSchemeName) => {
    if (theme === 'dark' && name !== 'dark') {
      dispatch(setTheme(theme));
    } else {
      dispatch(setTheme(theme));
    }
    await SecureStore.setItemAsync('theme', JSON.stringify(theme));
  };

  return (
    <View style={styles.container}>
      <CustomText title="Choose Your theme" size="xlarge" style={styles.themeTitle} />
      <View style={styles.themeContainer}>
        <TouchableOpacity
          style={[
            styles.themeItem,
            {
              backgroundColor: darkTheme.colors.backgroundColor,
              borderColor: name === 'dark' ? colors.primary : colors.secondaryText,
            },
          ]}
          onPress={() => handleThemeChange('dark')}>
          <CustomText title="Dark" size="large" variant="primary" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.themeItem,
            {
              backgroundColor: lightTheme.colors.backgroundColor,
              borderColor: name === 'light' ? colors.primary : colors.secondaryText,
            },
          ]}
          onPress={() => handleThemeChange('light')}>
          <CustomText title="Light" size="large" variant="primary" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsSecreen;
