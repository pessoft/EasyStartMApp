import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    minHeight: 124,
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 6,
    elevation: 4
  },
  directionRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  price: {
    marginTop: 3,
    alignSelf: 'center'
  },
  ingredient: {
    marginTop: 3,
  },
  textWrap: {
    flexWrap: 'wrap'
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginHorizontal: 18

  },
  imageContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    minHeight: 120
  },
  productHeader: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    minHeight: 102,
    paddingVertical: 5,
    paddingRight: 5
  },
  blockShopAction: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  blockShopButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 5
  }
})