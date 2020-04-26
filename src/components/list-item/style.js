import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  bodyItem: {
    height: 35,
    borderRadius: 4,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 25,
  },
  content: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 8
  },
  arrowContainer: {
    flex: 1
  }
})