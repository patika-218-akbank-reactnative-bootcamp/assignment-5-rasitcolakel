import { Dimensions, StyleSheet } from 'react-native';

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
  fullScreenPlayerContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  fullScreenHeaderTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    left: -15,
  },
  fullScreenPlayerImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenPlayerImage: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
  },
  trackDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  trackDetailItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowedContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  columnedContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  durationContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 30,
  },
});
