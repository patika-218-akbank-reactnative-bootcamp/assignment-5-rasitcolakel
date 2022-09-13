import { StyleSheet } from 'react-native';

export const ProfileDetailsScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    paddingHorizontal: 5,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  image: {
    width: 130,
    height: 130,
    margin: 10,
  },
  icon: {
    padding: 10,
  },
  text: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  listContainer: {
    width: '100%',
  },
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeTitle: {
    paddingVertical: 20,
  },
  themeItem: {
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    borderWidth: 3,
  },
});
