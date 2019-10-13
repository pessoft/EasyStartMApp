import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    minHeight: 105
  },
  directionRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  mt_5: {
    marginTop: 3
  },
  textWrap: {
    flexWrap: 'wrap'
  },
  rowWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  productTypeContainer: {
    flexDirection: 'row',
    marginLeft: 5
  },
  productType: {
    marginLeft: 5
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginHorizontal: 18

  },
  imageContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    minHeight: 105
  },
  productHeader: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderBottomWidth: 1,
    minHeight: 102,
    paddingVertical: 5,
    paddingRight: 5
  },
  blockShopAction: {
    alignItems: 'center',
    justifyContent: 'center',
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