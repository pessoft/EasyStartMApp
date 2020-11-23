import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Platform, DeviceEventEmitter } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

let registerPushOnNotificationIOS = {}
export const STORAGE_PUSH_KEY = '@STORAGE_PUSH_MESSAGES'

export const setupPushNotification = (handleNotification) => {
  PushNotification.configure({
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: true,
    requestPermissions: true,
    onNotification: async function (notification) {
      await onNotification(notification, handleNotification)
    },
  })

  return PushNotification
}

const onNotification = async (notification, handleNotification) => {
  if (Platform.OS == 'android') {
    let data = null
    if (!notification.foreground)
      data = notification.data ? JSON.parse(notification.data.payload) : JSON.parse(notification.payload)
    else if (notification.messageId)
      data = notification.data || JSON.parse(notification.payload)

    if (handleNotification)
      handleNotification(data)
  } else if (Platform.OS == 'ios') {
    const gcmMessageId = notification.data['gcm.message_id']
    let isTapped = !!registerPushOnNotificationIOS[gcmMessageId]

    if (!isTapped) {
      let initialNotification = await PushNotificationIOS.getInitialNotification()
      if (initialNotification) {
        const initialGcmMessageId = initialNotification._data['gcm.message_id']
        isTapped = initialGcmMessageId == gcmMessageId
      }
    }

    if (handleNotification && isTapped) {
      let data = JSON.parse(notification.data.payload)
      handleNotification(data)

      delete registerPushOnNotificationIOS[gcmMessageId]
    } else {
      registerPushOnNotificationIOS[gcmMessageId] = true
    }

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  }
}