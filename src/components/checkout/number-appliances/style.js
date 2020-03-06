import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  contacts: {
    flex: 1,
    paddingTop: 7,
    paddingBottom: 14,
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
    marginBottom: 6
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 10
  },
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    textAlign: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: Platform.OS == 'ios' ? 8 : 3
  },
  inputSize: {
    width: 280,
    height: 30
  },
})