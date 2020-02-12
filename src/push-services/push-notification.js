import PushNotification from 'react-native-push-notification'

export const setupPushNotification = handleNotification => {
  PushNotification.configure({

    onNotification: function (notification) {
      handleNotification(notification)
    },
  })

  return PushNotification
}