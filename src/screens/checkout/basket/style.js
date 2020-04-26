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
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
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
    borderRadius: 4,
    marginVertical: 5,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  workTimeInfonAnimationSize: {
    width: 250,
    height: 250,
  }
})