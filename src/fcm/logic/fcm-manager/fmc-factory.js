import { pushNotification } from './fcm-actions'

export const FCMActionType = {
  unknown: 0,
  pushNotification: 1,
}

export const fcmAction = fcmReceiveItem => {
  const action = fcmActionFactory(fcmReceiveItem.action)
  action(fcmReceiveItem.data)
}

const fcmActionFactory = fcmActionType => {
  switch (fcmActionType) {
    case FCMActionType.pushNotification:
      return pushNotification
    default:
      return () => { }
  }
}