import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Platform, DeviceEventEmitter } from 'react-native'

export const setupPushNotification = (handleNotification) => {
  PushNotification.configure({
    onNotification: function (notification) {
      if (Platform.OS == 'android') {
        let data = notification.data || JSON.parse(notification.payload)
        if (handleNotification)
          handleNotification(data)
      } else if (Platform.OS == 'ios') {
        if (handleNotification &&
          !notification.data.remote)
          handleNotification(notification.data)

        notification.finish(PushNotificationIOS.FetchResult.NoData)
      }
    },
  })

  return PushNotification
}