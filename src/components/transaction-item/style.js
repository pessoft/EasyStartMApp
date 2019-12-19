import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    paddingVertical: 12,
    paddingLeft: 20
  },
  text: {
    marginTop: 3,
  },
  textContainer: {
    flex: 8
  },
  arrowContainer: {
    flex: 1
  }
})