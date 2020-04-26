import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  directionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 90,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  textWrap: {
    flexWrap: 'wrap'
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  productImage: {
    width: 76,
    height: 76,
    borderRadius: 4,
  },
  productInfoContainer: {
    flex: 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingRight: 5
  },
  captionContainer: {
    flex: 1
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
})