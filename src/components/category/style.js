import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bodyItem: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 108,
    flex: 1,
  },
  captionCatalog: {
    flexWrap: 'wrap'
  },
  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catalogImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
    marginHorizontal: 18
  },
  captionContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingRight: 24,
    height: 108
  }
})