import { StyleSheet, Dimensions } from 'react-native'
let width = Dimensions.get('screen').width / 2 - 15

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    width: width,
    height: 150,
    borderRadius: 5,
    margin: 6,
    elevation: 4
  },
  captionCatalog: {
    flexWrap: 'wrap',
    textAlign: 'center',
    paddingHorizontal: 15
  },
  directionRow: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  catalogImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
    marginVertical: 18
  },
  captionContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150
  }
})