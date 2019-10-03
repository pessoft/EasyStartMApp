import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 12,
    marginVertical: 6,
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 10
  },
  inputText: {
    textAlign: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 3,
    padding: 3
  },
  inputBigSize: {
    width: 280,
  },
  inputSmallSize: {
    width: 135,
  },
  icoDeliveryAddress: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})