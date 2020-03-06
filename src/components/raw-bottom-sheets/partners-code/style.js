import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  inputContainer: {
    borderTopWidth: 0.8,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1.5,
    height: 36,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: Platform.OS == 'ios' ? 10 : 5
  },
})