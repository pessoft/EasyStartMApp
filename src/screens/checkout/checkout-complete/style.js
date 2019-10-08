import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  marginText: {
    marginTop: 5
  }
})