import { StyleSheet, Dimensions } from 'react-native'
let width = Dimensions.get('screen').width / 2 - 28

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    width: width,
    height: width,
    borderRadius: 6,
    margin: 8,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
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
    borderRadius: 6,
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