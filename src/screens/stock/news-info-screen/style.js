import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  image: {
    borderRadius: 6,
    marginTop: 10,
    aspectRatio: 115 / 37,
    resizeMode: 'contain',
    minWidth: '100%',
  },
  stockDescription: {
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  }
})