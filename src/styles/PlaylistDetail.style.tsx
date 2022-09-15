import { StyleSheet } from 'react-native';

export const PlaylistDetailStyles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  headerContainerView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 25,
  },
  imageAnimationStyle: {},
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  trackItemContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  trackItem: {
    flexDirection: 'column',
    flex: 1,
    margin: 3,
  },
  tracktItemImage: {
    width: 45,
    height: 45,
  },
  trackItemTitle: {
    flex: 1,
    marginLeft: 5,
    marginRight: 15,
    borderRadius: 5,
  },
  trackItemIcon: {
    height: 35,
    width: 35,
    padding: 5,
    paddingHorizontal: 10,
  },
});
