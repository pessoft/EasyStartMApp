import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 14,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
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