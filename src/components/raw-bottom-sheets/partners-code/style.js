import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  inputContainer: {
    borderTopWidth: 0.8,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1.5,
    height: 32,
    paddingVertical: 0,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    minHeight: 37,
    height: 37,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loader: {
    flex: 1,
    borderRadius: 4,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    minHeight: 35,
    justifyContent: 'center',
    alignItems: 'center'
  }
})