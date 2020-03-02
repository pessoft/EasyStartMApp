import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    paddingBottom: 14,
    paddingHorizontal: 12,
    marginVertical: 3,
    borderWidth: 0.8,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 5
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
  inputText: {
    textAlign: 'left',
    textAlignVertical: 'top',
    minHeight: 60,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 3,
    padding: 6,
  },
  inputSize: {
    width: 280,
  },
})