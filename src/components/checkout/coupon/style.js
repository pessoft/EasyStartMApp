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
    marginBottom: 10
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  inputText: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 3,
    padding: Platform.OS == 'ios' ? 5 : 3,
    marginHorizontal: 5
  },
  inputSize: {
    width: 220,
  },
})