import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    paddingBottom: 8
  },
  textBottom: {
    textAlignVertical: 'bottom'
  },
  mainTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  secondTextContainer: {
    flex: 0.8,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  priceRow: {
    flexDirection: 'row',
  },
  iconMargin: {
    marginLeft: 2,
    marginTop: 8
  }
})