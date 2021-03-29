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
  openStock,
  openNews,
  openOrderHistory
} from '../../logic/notification-open-actions/actions'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

import { setSelectedCategory, setSelectedProduct } from '../../../store/catalog/actions'
import { setSelectedStock } from '../../../store/stock/actions'
import { setSelectedNews } from '../../../store/news/actions'
import { setGoToOrderId } from '../../../store/history-order/actions'

const PlatformType = {
  'android': 0,
  'ios': 1
}

class FCMManagerComponent extends React.Component {

  constructor(props) {
    super(props)
    this.pushNotification = setupPushNotification(this.handleNotificationOpen)
  }

  notificationListenerRemove = () => { }

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
    if (Platform.OS == 'ios')
      this.settingFCMForIOS()
    else {
      this.registerToken()
      this.subscribeForegroundMessage()
    }
  }

  componentWillUnmount() {
    this.notificationListenerRemove() //This will remove the listener
  }

  subscribeForegroundMessage = async () => {
    this.notificationListenerRemove = messaging().onMessage(async remoteMessage => {
      let dataForAndroid = null
      const dataForIos = remoteMessage.data

      try {
        dataForAndroid = JSON.parse(remoteMessage.data.payload)
      } catch { }

      if (dataForAndroid)
        this.sendNotification(remoteMessage.messageId, dataForAndroid, dataForIos)
    })
  }

  sendNotification = (messageId, dataForAndroid, dataForIos) => {
    this.pushNotification.localNotification({
      messageId,
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
      title: dataForAndroid.title,
      message: dataForAndroid.message,
      data: dataForAndroid, // data for android
      userInfo: dataForIos, //data for ios
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
        options.setSelectedNews = this.props.setSelectedNews

        openStock(options)
        break
      case NotificationActionType.OpenNews:
        options.targetItems = this.props.news
        options.setSelectedStock = this.props.setSelectedStock
        options.setSelectedNews = this.props.setSelectedNews

        openNews(options)
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
        case NotificationActionType.OpenOrder:
          options.setGoToOrderId = this.props.setGoToOrderId
  
          openOrderHistory(options)
          break
    }
  }

  settingFCMForIOS = () => {
    PushNotificationIOS.removeEventListener('register', this.registerToken)
    PushNotificationIOS.addEventListener('register', this.registerToken)
    const isRegisteredForRemoteNotifications = firebase.messaging().isDeviceRegisteredForRemoteMessages
    if (!isRegisteredForRemoteNotifications) {
      this.props.registerAppWithFCM()
    }

    this.subscribeForegroundMessage()
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
    news: state.main.news,
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
  setSelectedNews,
  setNotificationActionExecution,
  registerDevice,
  setGoToOrderId,
}

export default connect(mapStateToProps, mapDispatchToProps)(FCMManagerComponent)