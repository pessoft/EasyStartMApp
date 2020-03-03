import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  directionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 90,
    borderRadius: 6,
    marginVertical: 5,
    paddingVertical: 10,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  textWrap: {
    flexWrap: 'wrap'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  productImage: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  productInfoContainer: {
    flex: 3,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  captionContainer: {
    flex: 1
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
})