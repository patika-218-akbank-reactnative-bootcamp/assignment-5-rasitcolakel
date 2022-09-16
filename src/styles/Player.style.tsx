import { StyleSheet } from 'react-native';

export const PlaylistStyles = StyleSheet.create({
  trackItemContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    height: '100%',
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
  tracktItemImageList: {
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
