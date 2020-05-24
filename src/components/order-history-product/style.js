import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  directionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 90,
    borderRadius: 6,
    marginVertical: 5,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  textWrap: {
    flexWrap: 'wrap'
  },
  imageContainer: {
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  productImage: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    marginRight: 10
  },
  productInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 10,
    paddingHorizontal: 10,
    height: 90,
  },
  captionContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  priceContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
})