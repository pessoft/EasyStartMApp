import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  contacts: {
    flex: 1,
    marginVertical: 6,
    paddingTop: 7,
    paddingBottom: 14,
    paddingHorizontal: 12,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 6
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 10
  },
  inputText: {
    textAlign: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 3,
    padding: Platform.OS == 'ios' ? 5 : 3
  },
  inputSize: {
    width: 280,
  },
})