import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Platform } from 'react-native'

export const setupPushNotification = handleNotification => {
  PushNotification.configure({
    onNotification: function (notification) {
      if (handleNotification &&
        !notification.data.remote)
        handleNotification(notification.data)

      notification.finish(PushNotificationIOS.FetchResult.NoData)
    },
  })

  return PushNotification
}