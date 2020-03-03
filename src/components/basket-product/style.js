import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 110,
    marginVertical: 5,
    borderRadius: 6,
    elevation: 4,
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
    height: 110
  },
  productHeader: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    height: 110,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  blockShopAction: {
    justifyContent: 'center',
    alignItems: 'flex-end',
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