import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Platform, View } from 'react-native'
import messaging, { firebase } from '@react-native-firebase/messaging'
import { registerAppWithFCM, requestPermission } from '../../../store/FCM/actions'
import { FCMManager } from '../../logic/fcm-manager/fcm-manger'

class FCMManagerComponent extends React.Component {

  constructor(props) {
    super(props)

    this.fcmManager = new FCMManager(Platform.OS == 'android')
  }

  componentDidMount() {
    if (Platform.OS == 'ios')
      this.settingFCMForIOS()

    this.subscribeForegroundMessage()
  }

  subscribeForegroundMessage = () => {
    messaging().onMessage(async remoteMessage => this.fcmManager.processing(remoteMessage.data))
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
    style: state.style
  }
}

const mapDispatchToProps = {
  registerAppWithFCM,
  requestPermission
}

export default connect(mapStateToProps, mapDispatchToProps)(FCMManagerComponent)