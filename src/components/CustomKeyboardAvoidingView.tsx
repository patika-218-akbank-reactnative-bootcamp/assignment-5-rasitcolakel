import CustomSafeAreaView from '@src/components/CustomSafeAreaView';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type Props = {
  children: React.ReactNode;
  isFlatList?: boolean;
};

const CustomKeyboardAvoidingView = ({ children, isFlatList }: Props) => {
  const Container = isFlatList ? View : ScrollView;
  const containerProps = isFlatList
    ? { style: styles.scrollContainer }
    : { contentContainerStyle: styles.scrollContainer };

  return (
    <CustomSafeAreaView>
      <KeyboardAvoidingView
        style={[styles.container]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Container {...containerProps}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
            {children}
          </TouchableWithoutFeedback>
        </Container>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CustomKeyboardAvoidingView;
