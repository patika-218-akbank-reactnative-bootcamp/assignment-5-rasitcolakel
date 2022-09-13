import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import CustomInput from '@src/components/CustomInput';
import CustomKeyboardAvoidingView from '@src/components/CustomKeyboardAvoidingView';
import CustomText from '@src/components/CustomText';
import { AuthStackParamsList } from '@src/screens/auth/';
import { useAppSelector } from '@src/store';
import { UserState, setUser } from '@src/store/slices/user';
import { AuthStyle as styles } from '@src/styles/Auth.style';
import { auth } from '@src/utils/firebase';
import * as SecureStore from 'expo-secure-store';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Alert, View } from 'react-native';
import { useDispatch } from 'react-redux';

type Props = NativeStackScreenProps<AuthStackParamsList, 'SignIn'>;

const SignIn = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { primary, backgroundColor } = useAppSelector((state) => state.theme.colors);
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogIn = async () => {
    try {
      const { email, password } = values;

      const user = await signInWithEmailAndPassword(auth, email, password);

      const userData: UserState = {
        user: {
          id: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName,
        },
        accessToken: user.user.refreshToken,
      };
      console.log(userData);
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
        <CustomText title="Sign In" variant="primary" size={25} style={styles.title} />
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
        />

        <CustomButton
          title="Log In"
          onPress={handleLogIn}
          variant="primary"
          fullWidth
          disabled={Object.values(values).some((value) => !value)}
        />
        <CustomButton
          title="Don't have an account? Create one"
          onPress={() => navigation.push('SignUp')}
          variant="transparent"
          fullWidth
        />
      </View>
    </CustomKeyboardAvoidingView>
  );
};

export default SignIn;
