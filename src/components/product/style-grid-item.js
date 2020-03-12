import { StyleSheet, Dimensions } from 'react-native'
let width = Dimensions.get('screen').width / 2 - 28

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    width: width,
    height: width + 100,
    margin: 6,
    borderRadius: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  captionBlock: {
    flex: 1,
    alignItems: 'flex-start',
  },
  directionRow: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  mt_5: {
    marginTop: 3
  },
  textWrap: {
    flexWrap: 'wrap',
  },
  rowWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  productTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderTopRightRadius: 6,
    padding: 5,
    height: 25,
  },
  productType: {
    paddingHorizontal: 2
  },
  productImage: {
    width: width,
    height: width,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  imageContainer: {
    justifyContent: 'center',
    width: width,
    height: width
  },
  productHeader: {
    justifyContent: 'space-between',
    width: width,
    height: 100,
    paddingTop: 4,
    paddingBottom: 5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  blockShopAction: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 0,
    height: 30,
    maxHeight: 30,
    maxWidth: width
  },
  blockShopButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
  },

  priceInImage: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 5,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
})