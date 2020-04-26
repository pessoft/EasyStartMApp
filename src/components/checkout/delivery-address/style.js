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
    borderRadius: 4,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
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
    borderRadius: 4,
    padding: Platform.OS == 'ios' ? 10 : 5
  },
  inputBigSize: {
    width: 280,
  },
  inputSmallSize: {
    flex: 1
  },
  icoDeliveryAddress: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  mr_bt_0: {
    marginBottom: 0,
  },

  mr_tp_0: {
    marginTop: 0,
  },

  b_tp_w_0: {
    borderTopWidth: 0,
  },

  b_bt_w_0: {
    borderBottomWidth: 0,
  },

  b_r_w_0: {
    borderRightWidth: 0
  },

  b_r_0: {
    borderRadius: 0
  },

  b_tp_l_r_0: {
    borderTopLeftRadius: 0,
  },

  b_tp_r_r_0: {
    borderTopRightRadius: 0,
  },

  b_bt_l_r_0: {
    borderBottomLeftRadius: 0,
  },

  b_bt_r_r_0: {
    borderBottomRightRadius: 0,
  },

})