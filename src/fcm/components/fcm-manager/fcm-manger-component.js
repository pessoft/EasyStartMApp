import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Platform, View } from 'react-native'
import messaging, { firebase } from '@react-native-firebase/messaging'
import { registerAppWithFCM, requestPermission } from '../../../store/FCM/actions'
import { setupPushNotification, NotificationStatus } from '../../../push-services/push-notification'
import {
  NotificationActionType,
  openCashback,
  openCategory,
  openPartners,
  openProductInfo,
  openStock
} from '../../logic/notification-open-actions/actions'

import { setSelectedCategory, setSelectedProduct } from '../../../store/catalog/actions'
import { setSelectedStock } from '../../../store/stock/actions'

class FCMManagerComponent extends React.Component {

  constructor(props) {
    super(props)
    this.pushNotification = setupPushNotification(data => this.handleNotificationOpen(data))
  }

  componentDidMount() {
    if (Platform.OS == 'ios')
      this.settingFCMForIOS()
      else 
      this.backgroundAndroid()

    this.subscribeForegroundMessage()
  }

  subscribeForegroundMessage = () => {
    messaging().onMessage(async remoteMessage => {
      let data = null
      try {
        data = JSON.parse(remoteMessage.data.payload)
      } catch{ }

      if (data)
        this.sendNotification(data)
    })
  }

  backgroundAndroid = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      let data = null
      try {
        data = JSON.parse(remoteMessage.data.payload)
      } catch{ }

      if (data)
        this.sendNotification(data)
    });
  }
  
  sendNotification = data => {
    this.pushNotification.localNotification({
      title: data.title,
      message: data.message,
      data: data, // data for android
      userInfo: data //data for ios
    })
  }

  handleNotificationOpen = data => {
    if (!data || !data.action)
      return

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
        openPartners(options)
        break
      case NotificationActionType.OpenCashback:
        openCashback(options)
        break
    }
  }

  settingFCMForIOS = () => {
    const isRegisteredForRemoteNotifications = firebase.messaging().isRegisteredForRemoteNotifications
    if (!isRegisteredForRemoteNotifications) {
      this.props.registerAppWithFCM()
    }

    this.props.requestPermission()
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
  }
}

const mapDispatchToProps = {
  registerAppWithFCM,
  requestPermission,
  setSelectedCategory,
  setSelectedProduct,
  setSelectedStock
}

export default connect(mapStateToProps, mapDispatchToProps)(FCMManagerComponent)