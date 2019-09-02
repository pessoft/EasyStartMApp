import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  directionRow: {
    flexDirection: 'row'
  },
  mt_5: {
    marginTop: 5
  },
  textWrap: {
    flex: 1,
    flexWrap: 'wrap'
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 10
  },
  productHeader: {
    flex: 1,
    alignSelf: 'stretch',
    marginHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.8,
  },
  blockShopAction: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10
  },
  blockShopButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
})