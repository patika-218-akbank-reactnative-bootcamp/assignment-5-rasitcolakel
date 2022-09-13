import { StyleSheet } from 'react-native';

export const HomeStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  title: {
    paddingVertical: 15,
    paddingHorizontal: 3,
  },
  playlistContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  playlistItemContainer: {
    flexBasis: '50%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: 50,
    margin: 3,
    borderRadius: 5,
  },
  playlistItemImage: {
    width: 50,
    height: 50,
  },
  playlistItemTitle: {
    flex: 1,
    marginLeft: 5,
    margin: 5,
    padding: 5,
    borderRadius: 5,
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
    borderRadius: 5,
  },
});
