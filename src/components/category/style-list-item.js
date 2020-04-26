import { StyleSheet, Dimensions, Platform } from 'react-native'
let width = Dimensions.get('screen').width - 24
const size = 94

export default StyleSheet.create({
  bodyItem: {
    justifyContent: 'center',
    flex: 1,
    width: width,
    height: size,
    borderRadius: 4,
    marginTop: 0,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  captionCatalog: {
    flexWrap: 'wrap',
    textAlign: 'left',
    paddingHorizontal: 15
  },
  directionRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imageContainer: {
    width: size,
    height: size,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  catalogImage: {
    width: size,
    height: size,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  captionContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
})