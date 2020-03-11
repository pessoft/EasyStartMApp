import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 5,
    borderRadius: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  image: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  cardName: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexWrap: 'wrap'
  }
})