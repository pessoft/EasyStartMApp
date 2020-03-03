import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    elevation: 4,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 150,
    height: 150
  },
  success: {
    width: 150,
    height: 150
  },
  error: {
    width: 150,
    height: 150
  },
  info: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue'
  },
  infoText: {
    marginTop: 5,
    textAlign: 'center',
    width: 300
  },
  buttonOk: {
    width: 280,
    alignItems: 'stretch',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    position: 'absolute',
    bottom: 10,
  },
})