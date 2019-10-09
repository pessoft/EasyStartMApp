import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    paddingTop: 17,
    paddingBottom: 17,
    paddingHorizontal: 12,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 4,
  },
  header: {
    paddingHorizontal: 10
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 5,
  },
  paddingBottomText: {
    paddingBottom: 5
  }
})