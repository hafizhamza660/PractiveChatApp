import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

export const commonStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homecontainer: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },

  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});
