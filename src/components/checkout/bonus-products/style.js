import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    paddingBottom: 14,
    paddingHorizontal: 12,
    marginVertical: 3,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 6
  },
  content: {
    flex: 1,
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