import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loader: {
    width: 120,
    height: 120
  },
  success: {
    width: 120,
    height: 120
  },
  error: {
    width: 120,
    height: 120
  },
  info: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue'
  },
  marginText: {
    marginBottom: 5
  }
})