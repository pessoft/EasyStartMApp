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
    paddingHorizontal: 18
  },
  text: {
    marginTop: 3,
  },
  iconMargin: {
    marginLeft: 2,
  },
  textContainer: {
    flex: 7.5
  },
  amountMoneyContainer: {
    flex: 2.5,
    marginTop: 3,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center'
  }
})