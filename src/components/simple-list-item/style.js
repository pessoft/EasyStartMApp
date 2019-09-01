import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 60,
    borderBottomWidth: 1,
  },
  textWrap: { 
    flex: 1, 
    flexWrap: 'wrap'
   },
  selectedItem: {
    fontWeight: 'bold',
    fontSize: 17
  },
  ph_10: {
    paddingHorizontal: 10
  }
})