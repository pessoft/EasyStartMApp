import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  
  directionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 90,
    paddingVertical: 10
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
    borderRadius: 5,
  },
  productInfoContainer: {
    flex: 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderBottomWidth: 1,
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