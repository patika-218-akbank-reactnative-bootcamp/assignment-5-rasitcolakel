import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import CustomInput from '@src/components/CustomInput';
import CustomKeyboardAvoidingView from '@src/components/CustomKeyboardAvoidingView';
import CustomText from '@src/components/CustomText';
import { useAppSelector } from '@src/store';
import { UserState, setUser } from '@src/store/slices/user';
import { AuthStyle as styles } from '@src/styles/Auth.style';
import { auth } from '@src/utils/firebase';
import { updateProfile } from 'firebase/auth';
import React from 'react';
import { Alert, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { ProfileScreenParamsList } from '..';

type Props = NativeStackScreenProps<ProfileScreenParamsList, 'EditProfile'>;

const EditProfileScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { primary, backgroundColor } = useAppSelector((state) => state.theme.colors);
  const [values, setValues] = React.useState({
    displayName: user?.displayName,
  });

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProfileScreen = async () => {
    try {
      const { displayName } = values;
      await updateProfile(auth.currentUser, { displayName });
      console.log('Buraya geldi');
      const userData: UserState = {
        user: {
          id: auth.currentUser.uid,
          email: auth.currentUser.email,
          displayName: auth.currentUser.displayName,
        },
        accessToken: auth.currentUser.refreshToken,
      };
      dispatch(setUser(userData));
      navigation.goBack();
    } catch (error: any) {
      console.log(error);
      Alert.alert('Error', error);
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <View style={[styles.container, { shadowColor: primary, backgroundColor }]}>
        <CustomText title="Edit Profile" variant="primary" size={25} style={styles.title} />
        <CustomInput
          placeholder="Full Name"
          value={values.displayName}
          onChangeText={(text) => handleChange('displayName', text)}
        />
        <CustomButton
          title="Save"
          onPress={handleEditProfileScreen}
          variant="primary"
          fullWidth
          disabled={Object.values(values).some((value) => !value)}
        />
      </View>
    </CustomKeyboardAvoidingView>
  );
};

export default EditProfileScreen;
