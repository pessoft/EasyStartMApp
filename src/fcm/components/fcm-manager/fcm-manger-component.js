import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Platform, View } from 'react-native'
import messaging, { firebase } from '@react-native-firebase/messaging'
import { registerAppWithFCM, requestPermission, setNotificationActionExecution, registerDevice } from '../../../store/FCM/actions'
import { setupPushNotification } from '../../../push-services/push-notification'
import {
  NotificationActionType,
  openCashback,
  openCategory,
  openPartners,
  openProductInfo,
  openStock
} from '../../logic/notification-open-actions/actions'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

import { setSelectedCategory, setSelectedProduct } from '../../../store/catalog/actions'
import { setSelectedStock } from '../../../store/stock/actions'

const PlatformType = {
  'android': 0,
  'ios': 1
}

class FCMManagerComponent extends React.Component {

  constructor(props) {
    super(props)
    this.pushNotification = setupPushNotification(this.handleNotificationOpen)
  }

  getDeviceData = () => {
    return {
      branchId: this.props.user.branchId,
      clientId: this.props.user.clientId,
      platform: PlatformType[Platform.OS],
    }
  }

  registerToken = () => {
    let device = this.getDeviceData()
    this.props.registerDevice(device)
  }

  componentDidMount() {
    // if (Platform.OS == 'ios')
    //   this.settingFCMForIOS()
    // else {
    //   this.registerToken()
    //   this.subscribeForegroundMessage()
    // }
  }

  subscribeForegroundMessage = async () => {
    messaging().onMessage(async remoteMessage => {
      let data = null

      try {
        data = JSON.parse(remoteMessage.data.payload)
      } catch{ }

      if (data)
        this.sendNotification(data)
    })
  }

  sendNotification = data => {
    this.pushNotification.localNotification({
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
      title: data.title,
      message: data.message,
      data: data, // data for android
      userInfo: data, //data for ios
    })
  }

  handleNotificationOpen = data => {
    if (!data || !data.action)
      return

    if (this.props.categories.length == 0) {
      this.props.setNotificationActionExecution(() => this.handleNotificationOpen(data))
      return
    }

    let options = {
      navigate: this.props.navigation.navigate,
      targetId: data.action.targetId,
      targetItems: null,
    }

    switch (data.action.type) {
      case NotificationActionType.OpenCategory:
        options.targetItems = this.props.categories
        options.setSelectedCategory = this.props.setSelectedCategory
        options.setSelectedProduct = this.props.setSelectedProduct

        openCategory(options)
        break

      case NotificationActionType.OpenProductInfo:
        options.targetItems = this.props.products
        options.setSelectedProduct = this.props.setSelectedProduct

        openProductInfo(options)
        break

      case NotificationActionType.OpenStock:
        options.targetItems = this.props.stocks
        options.setSelectedStock = this.props.setSelectedStock

        openStock(options)
        break

      case NotificationActionType.OpenPartners:
        if (this.props.isLogin &&
          this.props.promotionPartnersSetting.IsUsePartners)
          openPartners(options)
        break

      case NotificationActionType.OpenCashback:
        if (this.props.isLogin &&
          this.props.promotionCashbackSetting.IsUseCashback)
          openCashback(options)
        break
    }
  }

  settingFCMForIOS = () => {
    PushNotificationIOS.removeEventListener('register', this.registerToken)
    PushNotificationIOS.addEventListener('register', this.registerToken)
    const isRegisteredForRemoteNotifications = firebase.messaging().isRegisteredForRemoteNotifications
    if (!isRegisteredForRemoteNotifications) {
      this.props.registerAppWithFCM()
    }
  }

  render() {
    return <React.Fragment />
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    categories: state.main.categories,
    products: state.main.products,
    stocks: state.main.stocks,
    appPackageName: state.appSetting.appPackageName,
    isLogin: state.user.isLogin,
    user: state.user,
    granted: state.fcm.granted,
    promotionPartnersSetting: state.main.promotionPartnersSetting,
    promotionCashbackSetting: state.main.promotionCashbackSetting,
  }
}

const mapDispatchToProps = {
  registerAppWithFCM,
  requestPermission,
  setSelectedCategory,
  setSelectedProduct,
  setSelectedStock,
  setNotificationActionExecution,
  registerDevice
}

export default connect(mapStateToProps, mapDispatchToProps)(FCMManagerComponent)