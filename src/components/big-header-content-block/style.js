import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingVertical: 10
  },
  mainText: {
    flex: 1,
    flexDirection: 'row',
    textAlignVertical: 'bottom'
  },
  secondText: {
    flex: 0.8,
    textAlignVertical: 'bottom'
  },
  iconMargin: {
    marginLeft: 2,
    marginTop: 2
  }
})