import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingVertical: 15

  },
  captionProduct: {
    fontSize: 16
  },
  directionRow: {
    flexDirection: 'row'
  },
  bottmBorder: {
    borderBottomWidth: 0.8,
    borderColor: '#e0e0e0'
  },
  rounded: {
    borderRadius: 10
  },
  ph_10: {
    paddingHorizontal: 10
  },
  mt_5: {
    marginTop: 5
  },
  textWrap: { 
    flex: 1, 
    flexWrap: 'wrap'
   },
  imageNormalSize: {
    width: 85,
    height: 85
  },
  productHeader: {
    flex:1,
    alignSelf: 'stretch',
    marginHorizontal: 15,
    paddingBottom: 10
  },
  blockShopAction: {
    flexDirection: 'row',
    marginTop: 10
  },
  blockShopButtons: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'flex-end'
  }
})