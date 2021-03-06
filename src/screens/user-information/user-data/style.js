import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    textAlign: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    padding: Platform.OS == 'ios' ? 10 : 5
  },
  inputSize: {
    width: 280,
    minHeight: 35
  },
  buttonNext: {
    marginTop: 10
  },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  dateBirth: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS == 'ios' ? 10 : 5,
  },
  mainContainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondaryContainer: {
    flex: 0.15,
  }
})