import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputText: {
    textAlign: 'center',
    marginBottom: 15,
    margin: 0,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: Platform.OS == 'ios' ? 10 : 5
  },
  mainContainer: {
    flex: 0.7,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  phoneNumber: {
    marginBottom: 0,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  password: {
    marginBottom: 0,
    marginTop: 0,
    borderRadius: 0,
  },
  passwordRepeat: {
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
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
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})