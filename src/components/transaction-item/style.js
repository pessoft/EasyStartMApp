import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 14,
    borderRadius: 6,
    elevation: 4,
    marginVertical: 4
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
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
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})