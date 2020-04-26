import { StyleSheet, Dimensions, Platform } from 'react-native'
let width = Dimensions.get('screen').width / 2 - 12

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    width: width,
    height: width,
    borderRadius: 4,
    margin: 5, // тут пофиксил
    marginTop: 0,
    marginBottom: Platform.OS == 'ios' ? 6 : 8,
    borderWidth: 0.5
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
  imageContainer: {
    borderRadius: 4
  },
  catalogImage: {
    width: width-1,
    height: width-1,
    borderRadius: 4
  },
  captionContainer: {
    width: width-1,
    alignItems: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    height: 40,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 4,
    zIndex:10
  }
})