import { Dimensions, StyleSheet } from 'react-native';

export const PlaylistDetailStyles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  listHeaderContainer: {
    paddingVertical: 15,
  },
  listHeaderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  listHeaderItemIcon: {
    marginRight: 10,
  },
  skeletonText: {
    height: 20,
    width: 200,
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
    margin: 5,
  },
});
