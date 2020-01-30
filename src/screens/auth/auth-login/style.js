import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    textAlign: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 3,
    padding: Platform.OS == 'ios' ? 5 : 3
  },
  inputSize: {
    width: 280,
  },
  buttonsContainer: {
    marginTop: 5
  },
  buttonMargin: {
    margin: 5
  },
  loginIcon: {
    borderRadius: 20,
    marginBottom: 50,

  },
})