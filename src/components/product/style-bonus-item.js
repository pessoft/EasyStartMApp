import { StyleSheet, Dimensions } from 'react-native'

let width = Dimensions.get('screen').width - 58

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    width: width,
    height: 85,
    marginVertical: 5,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  captionBlock: {
    flex: 1,
    alignItems: 'flex-start',
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
    flexWrap: 'wrap',
  },
  rowWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    width: 85,
    height: 85,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    marginRight: 10
  },
  imageContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    minHeight: 85
  },
  productHeader: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    height: 85,
    paddingTop: 4,
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  blockShopAction: {
    alignItems: 'flex-end',
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