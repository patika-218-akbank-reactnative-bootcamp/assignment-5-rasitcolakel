import { StyleSheet } from 'react-native';

export const ProfileScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    paddingHorizontal: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    paddingHorizontal: 5,
  },

  image: {
    width: 40,
    height: 40,
    margin: 10,
  },
  icon: {
    padding: 10,
    marginLeft: 'auto',
    fontSize: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});
