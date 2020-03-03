import { StyleSheet, Dimensions } from 'react-native'

const size = Dimensions.get('screen').width
const top = 0.7 * size

export default StyleSheet.create({
  basketProducts: {
    flex: 2
  },
  footer: {
    bottom: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 6,
    elevation: 4
  },
  buttonSize: {
    width: 230,
  },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrongContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  wrong: {
    width: size,
    height: size
  },
  wrongText: {
    position: 'absolute',
    top: top
  }
})