import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 72,
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
    paddingHorizontal: 14
  },
  text: {
    marginTop: 3,
  },
  iconMargin: {
    marginLeft: 2,
    marginTop: 2,
  },
  textContainer: {
    flex: 6.5
  },
  amountMoneyContainer: {
    flex: 2.5,
    marginTop: 3,
    height: 72,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})