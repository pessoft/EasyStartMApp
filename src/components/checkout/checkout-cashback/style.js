import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  inputText: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 3,
    padding: Platform.OS == 'ios' ? 8 : 3
  },
  inputSize: {
    width: 280,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    paddingTop: 10,
    marginTop: 10
  },
  cashBackInputContainer: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 12,
  }
})