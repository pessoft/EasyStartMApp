import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Platform, DeviceEventEmitter } from 'react-native'

let registerPushOnNotificationIOS = {}

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
      if (Platform.OS == 'android') {
        let data = notification.data || JSON.parse(notification.payload)
        if (handleNotification)
          handleNotification(data)
      } else if (Platform.OS == 'ios') {
        const gcmMessageId = notification.data['gcm.message_id']
        let isTapped = !!registerPushOnNotificationIOS[gcmMessageId]

        if(!isTapped) {
          let initialNotification = await PushNotificationIOS.getInitialNotification()
          if(initialNotification) {
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
    },
  })

  return PushNotification
}