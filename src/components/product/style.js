import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 110,
    marginVertical: 5,
    borderRadius: 6,
    elevation: 5,
  },
  directionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
    // marginBottom: 10,
  },
  productTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },
  productType: {
    marginLeft: 5
  },
  productImage: {
    width: 110,
    height: 110,
    borderRadius: 6,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: 10

  },
  imageContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    minHeight: 110
  },
  productHeader: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    height: 110,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  captionBlock: {
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