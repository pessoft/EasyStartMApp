import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 0.60,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  inputText: {
    textAlign: 'center',
    marginBottom: 15,
    margin: 0,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: Platform.OS == 'ios' ? 10 : 5
  },
  firstInput: {
    marginBottom: 0,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0

  },
  secondInput: {
    marginTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  inputSize: {
    width: 280,
  },
  buttonsSecondary: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 12,
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