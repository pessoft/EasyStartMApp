import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  image: {
    borderRadius: 4,
    marginTop: 10,
    aspectRatio: 115 / 37,
    resizeMode: 'stretch',
    minWidth: '100%',
  },
  stockDescription: {
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  }
})