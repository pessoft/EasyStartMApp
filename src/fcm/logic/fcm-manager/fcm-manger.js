import { fcmAction } from './fmc-factory'

export class FCMManager {

  processing = data => {
    if (!this.isValidData(data))
      return

    try {
      const payload = JSON.parse(data.payload)
      for (item of payload) {
        fcmAction(item)
      }
    } catch{ }
  }

  isValidData = data => {
    if (!data || !data.payload)
      return false
    else
      return true
  }
}