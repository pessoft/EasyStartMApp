import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bodyItem: {
    height: 56,
    borderRadius: 4,
    marginVertical: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 4,
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
