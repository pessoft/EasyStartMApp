import { StyleSheet, Dimensions } from 'react-native'
let width = Dimensions.get('screen').width / 2 - 15

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    width: width,
    height: 150,
    borderRadius: 5,
    margin: 5,
    elevation: 4,
    paddingVertical: 15
  },
  captionCatalog: {
    flexWrap: 'wrap',
    textAlign: 'center',
    paddingHorizontal: 15
  },
  directionRow: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  catalogImage: {
    width: 95,
    height: 95,
    borderRadius: 5,
  },
  captionContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  }
})