import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 14,
    paddingBottom: 6,
    paddingHorizontal: 12,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 6,
    elevation: 4,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 2
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textPadding: {
    paddingBottom: 4
  },
  buttonComplete: {
    width: 230,
    marginTop: 3
  }
})