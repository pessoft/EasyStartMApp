import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    paddingBottom: 14,
    paddingHorizontal: 12,
    marginVertical: 3,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 6,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  text: {
    flex: 0.4,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 15
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
})