import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  text: {
    marginTop: 3,
  },
  iconMargin: {
    marginLeft: 2,
  },
  amountMoney: {
    flex: 1,
    marginTop: 3,
    height: 60,
    textAlign: 'right'
  },
  textContainer: {
    flex: 8
  },
  amountMoneyContainer: {
    flex: 2
  }
})