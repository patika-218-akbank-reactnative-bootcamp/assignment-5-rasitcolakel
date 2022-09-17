import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import CustomInput from '@src/components/CustomInput';
import CustomKeyboardAvoidingView from '@src/components/CustomKeyboardAvoidingView';
import CustomText from '@src/components/CustomText';
import { AuthStackParamsList } from '@src/screens/auth/';
import { useAppSelector } from '@src/store';
import { UserState, setUser } from '@src/store/slices/user';
import { AuthStyle as styles } from '@src/styles/Auth.style';
import { saveUserToFirestore } from '@src/utils/api';
import { auth } from '@src/utils/firebase';
import * as SecureStore from 'expo-secure-store';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React from 'react';
import { Alert, View } from 'react-native';
import { useDispatch } from 'react-redux';

type Props = NativeStackScreenProps<AuthStackParamsList, 'SignUp'>;

const SignUp = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { primary, backgroundColor } = useAppSelector((state) => state.theme.colors);
  const [values, setValues] = React.useState({
    email: '',
    displayName: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    try {
      const { email, password, confirmPassword, displayName } = values;
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      const user = await createUserWithEmailAndPassword(auth, email, password);

      // update user
      await updateProfile(auth.currentUser, { displayName }).then(() => {
        console.log('update successful');
      });
      const savedUser = await saveUserToFirestore(user);
      console.log(savedUser);
      const userData: UserState = {
        user: {
          id: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName,
        },
        accessToken: user.user.refreshToken,
      };

      dispatch(setUser(userData));
      // save user to db
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <View style={[styles.container, { shadowColor: primary, backgroundColor }]}>
        <CustomText title="Sign Up" variant="primary" size={25} style={styles.title} />

        <CustomInput
          placeholder="Full Name"
          value={values.displayName}
          onChangeText={(text) => handleChange('displayName', text)}
        />
        <CustomInput
          placeholder="Email"
          value={values.email}
          onChangeText={(text) => handleChange('email', text)}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomInput
          placeholder="Password"
          secureTextEntry
          value={values.password}
          onChangeText={(text) => handleChange('password', text)}
          textContentType="password"
        />
        <CustomInput
          placeholder="Confirm Password"
          secureTextEntry
          value={values.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          textContentType="password"
        />

        <CustomButton
          title="Sign Up"
          onPress={handleSignUp}
          variant="primary"
          fullWidth
          disabled={Object.values(values).some((value) => !value)}
        />
        <CustomButton
          title="Do you have an account? Sign In"
          onPress={() => navigation.goBack()}
          variant="transparent"
          fullWidth
        />
      </View>
    </CustomKeyboardAvoidingView>
  );
};

export default SignUp;
