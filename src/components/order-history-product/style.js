import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  directionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 90,
    borderRadius: 4,
    marginVertical: 5,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
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
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
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