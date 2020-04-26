import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  itemRow: {
    flex: 1,
    justifyContent: 'center',
  },
  textCenter: {
    textAlignVertical: 'center'
  },
  buttonRefCodeContainer: {
    flex: 0.8,
    justifyContent: 'flex-start',
    width: 200
  },
  secondTextContainer: {
    flex: 0.8,
    justifyContent: 'flex-end',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    marginLeft: 2,
    marginTop: 3
  }
})