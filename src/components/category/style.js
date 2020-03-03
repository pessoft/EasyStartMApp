import { StyleSheet, Dimensions } from 'react-native'
let width = Dimensions.get('screen').width / 2 - 15

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    width: width,
    height: width,
    borderRadius: 5,
    margin: 5,
    elevation: 4,
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
    width: width,
    height: width,
    borderRadius: 5,
  },
  captionContainer: {
    width: width,
    alignItems: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    height: 45,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  }
})