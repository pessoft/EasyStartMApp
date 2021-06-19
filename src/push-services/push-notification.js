import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Platform } from 'react-native'

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
  if(notification.userInteraction) {
    const data = JSON.parse(notification.data.payload)
    
    handleNotification(data)
  }
  
  if (Platform.OS == 'ios') 
    notification.finish(PushNotificationIOS.FetchResult.NoData)
}