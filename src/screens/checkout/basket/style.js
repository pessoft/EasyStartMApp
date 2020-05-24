import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  basketProducts: {
    flex: 2
  },
  footer: {
    bottom: 0,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  footerText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  buttonSize: {
    width: 230,
  },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  workTimeInfonAnimationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 5,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  workTimeInfonAnimationSize: {
    width: 250,
    height: 250,
  }
})