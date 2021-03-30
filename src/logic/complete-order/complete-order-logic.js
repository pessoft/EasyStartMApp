import { DeliveryType } from '../../logic/promotion/delivery-type'

export const getTimeOrderProcessedInfo = (deliveryType, approximateDeliveryTime) => {
    let timeInfoMessage = ''
    
    if (approximateDeliveryTime) {
      const approximateTime = new Date(approximateDeliveryTime)
      const currentDate = new Date();
      const isDateEquals = approximateTime.toDateString() == currentDate.toDateString()
      const minutesStr = approximateTime.getMinutes() < 10 ? `0${approximateTime.getMinutes()}` : `${approximateTime.getMinutes()}`
      const timeStr = `${approximateTime.getHours()}:${minutesStr}`
      const dateStr = approximateTime.toLocaleDateString()
      const timeInfo = isDateEquals ? timeStr : `${dateStr} ${timeStr}`
      timeInfoMessage = getTimeOrderProcessedInfoTemplateMessage(deliveryType, timeInfo)
    }
  
    return timeInfoMessage
  }
  
  const getTimeOrderProcessedInfoTemplateMessage = (deliveryType, timeInfo) => {
    switch(deliveryType) {
      case DeliveryType.Delivery:
        return `Приблизитльеное время доставки ${timeInfo}`
        case DeliveryType.TakeYourSelf:
          return `Приблизитльеное время готовности заказа ${timeInfo}`
        default:
          return ''
    }
  }