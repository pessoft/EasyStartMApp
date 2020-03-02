import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    minHeight: 110,
    marginVertical: 5,
    borderRadius: 6,
    elevation: 6,
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
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginHorizontal: 18

  },
  imageContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    minHeight: 110
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