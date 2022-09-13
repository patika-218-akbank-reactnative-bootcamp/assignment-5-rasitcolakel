import { StyleSheet } from 'react-native';

export const AuthStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5%',
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10,
    elevation: 24,
    padding: 15,
    borderRadius: 10,
    paddingVertical: 30,
  },
  title: {
    padding: 10,
  },
});
