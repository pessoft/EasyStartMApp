import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  contacts: {
    flex: 1,
    paddingTop: 7,
    paddingBottom: 14,
    paddingHorizontal: 12,
    marginVertical: 3,
    borderWidth: 0.8,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 5
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 10
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  inputText: {
    width: 160,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 3,
    padding: Platform.OS == 'ios' ? 8 : 3,
    marginHorizontal: 5
  }
})