import { fcmAction } from './fmc-factory'

export class FCMManager {

  processing = data => {
    alert('push')
    if (!this.isValidData(data))
      return

    for (item of data.payload) {
      fcmAction(item)
    }
  }

  isValidData = data => {
    if (!data || !data.payload || !Array.isArray(data.payload))
      return false
    else true
  }
}