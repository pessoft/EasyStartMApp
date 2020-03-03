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
    borderRadius: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
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