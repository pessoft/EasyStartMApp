import { StyleSheet, Dimensions, Platform } from 'react-native'
let width = Dimensions.get('screen').width - 36
const size = 94

export default StyleSheet.create({
  bodyItem: {
    justifyContent: 'center',
    flex: 1,
    width: width,
    height: size,
    borderRadius: 6,
    marginTop: 0,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 4,
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
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  catalogImage: {
    width: size,
    height: size,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  captionContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
})