import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    paddingVertical: 20,
  },
  textContainer: {
    flex: 8
  },
  arrowContainer: {
    flex: 1
  }
})