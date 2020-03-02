import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    paddingBottom: 14,
    paddingHorizontal: 12,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 5,
    elevation: 6
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 6
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
    padding: Platform.OS == 'ios' ? 8 : 3
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