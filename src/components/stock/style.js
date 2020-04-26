import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 5,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  image: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    aspectRatio: 115 / 37,
    resizeMode: 'stretch',
  },
  cardName: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexWrap: 'wrap'
  }
})