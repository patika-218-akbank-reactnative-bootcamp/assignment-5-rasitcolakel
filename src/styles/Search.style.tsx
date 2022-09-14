import { StyleSheet } from 'react-native';

export const SearchScreenStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  searchContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainerIcon: {
    fontSize: 100,
    margin: 20,
  },
  searchContainerText: {
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerCancel: {
    marginLeft: 10,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreItemContainer: {
    flexBasis: '50%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  genreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: 70,
    margin: 3,
    borderRadius: 5,
  },
  genreItemImage: {
    width: 70,
    height: 70,
  },
  genreItemTitle: {
    minHeight: 10,
    flex: 1,
    marginLeft: 5,
    margin: 5,
    padding: 5,
    borderRadius: 5,
    fontSize: 17,
  },
  icon: {
    padding: 10,
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
