import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    marginVertical: 3,
    paddingTop: 17,
    paddingBottom: 17,
    paddingHorizontal: 12,
    borderWidth: 0.8,
    marginVertical: 3,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row',
    borderRadius: 5
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