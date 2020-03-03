import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingTop: 17,
    paddingBottom: 17,
    paddingHorizontal: 12,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row',
    borderRadius: 5,
    elevation: 6
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