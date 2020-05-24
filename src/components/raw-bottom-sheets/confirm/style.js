import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  messageContainer: {
    flex: 1,
  },
  messageTitle: {
    fontWeight: 'bold',
    paddingBottom: 15

  },
  message: {
    lineHeight: 24,
    marginVertical: 20
  },
  messageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50,
  },
  buttonContainer: {
    width: 100,
    margin: 5,
  }
})