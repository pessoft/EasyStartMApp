import { pushNotification } from './fcm-actions'

export const fcmActionType = {
  unknown: 0,
  pushNotification: 1,
}

export const fcmAction = fcmReceiveItem => {
  const action = fcmActionFactory(fcmReceiveItem.action)

  action(fcmReceiveItem.data)
}

const fcmActionFactory = fcmActionType => {
  switch (fcmActionType) {
    case fcmActionType.pushNotification:
      return pushNotification
    default:
      return () => { }
  }
}