import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 0,
    marginBottom: 12,
    marginHorizontal: 0,
    borderRadius: 5,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  image: {
    borderRadius: 5,
    aspectRatio: 115 / 37,
    resizeMode: 'stretch',
  }
})