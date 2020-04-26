import { StyleSheet, Dimensions } from 'react-native'
const min320 = Dimensions.get('window').width <= 320

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    paddingBottom: 14,
    paddingHorizontal: 12,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
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
    paddingHorizontal: 6
  },
  inputText: {
    textAlign: 'left',
    textAlignVertical: 'top',
    minHeight: 60,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 4,
    padding: 6,
  },
  inputSize: {
    width: 280,
  },
})