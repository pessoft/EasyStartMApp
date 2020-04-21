const DaysShort = {
  1: "Пн",
  2: "Вт",
  3: "Ср",
  4: "Чт",
  5: "Пт",
  6: "Сб",
  7: "Вс",
}

export const getWorkTime = timeDelivery => {
  const dayIds = Object.keys(DaysShort).sort()
  const freeDay = 'выходной'
  let workMode = []
  workMode.getLastItem = () => workMode.length ? workMode[workMode.length - 1] : null

  for (let dayId of dayIds) {
    let timePeriod = timeDelivery[dayId];
    const workTime = timePeriod && timePeriod.length == 2 ?
      timePeriod.join('-') :
      freeDay

    let daysEqualWorkMode = workMode.getLastItem()
    const addDaysEqualWorkMode = () => {
      workMode.push({
        workTime: workTime,
        dayIds: [dayId]
      })
    }

    if (daysEqualWorkMode && daysEqualWorkMode.workTime == workTime)
      daysEqualWorkMode.dayIds.push(dayId)
    else
      addDaysEqualWorkMode()
  }

  let daysStr = [];

  for (const workDay of workMode) {
    let daysWorkMode = ''
    if (workDay.dayIds.length > 2) {
      const firstPeriodDay = DaysShort[workDay.dayIds[0]]
      const lastPeriodDay = DaysShort[workDay.dayIds[workDay.dayIds.length - 1]]

      daysWorkMode = `${firstPeriodDay}-${lastPeriodDay}: ${workDay.workTime}`
    } else
      daysWorkMode = `${workDay.dayIds.map(p => DaysShort[p]).join()}: ${workDay.workTime}`

    daysStr.push(daysWorkMode)
  }

  return daysStr;
}

export const isWorkTime = (operationMode, date) => {
  const currentDate = date ?? new Date()
  const currentDay = currentDate.getDay() == 0 ? 7 : currentDate.getDay()
  const currentHours = currentDate.getHours()
  const currentMinutes = currentDate.getMinutes()

  const currentWorkPeriod = operationMode[currentDay]

  if (currentWorkPeriod && currentWorkPeriod.length == 2) {
    const splitStartPeriod = currentWorkPeriod[0].split(':').map(p => parseInt(p))
    const splitEndPeriod = currentWorkPeriod[1].split(':').map(p => parseInt(p))

    if (splitStartPeriod[0] > splitEndPeriod[0] &&
      splitEndPeriod[0] == 0) {
      splitEndPeriod[0] = 24
      splitEndPeriod[1] = 0
    }

    if (splitStartPeriod[0] > splitEndPeriod[0]) {
      if (currentHours < splitEndPeriod[0])
        return true
      else if (currentHours >= splitStartPeriod[0]) {
        if (currentHours > splitStartPeriod[0]
          || currentMinutes >= splitStartPeriod[1])
          return true
      }
    } else if (currentHours >= splitStartPeriod[0]
      && currentHours < splitEndPeriod[0]) {
      if (currentHours > splitStartPeriod[0]
        || currentMinutes >= splitStartPeriod[1])
        return true
    } else if (currentHours >= splitStartPeriod[0]
      && currentHours == splitEndPeriod[0]) {
      if (currentHours == splitEndPeriod[0]
        && currentMinutes <= splitEndPeriod[1])
        return true
    }
  }

  return false
}

export const isValidDay = (dateCheck, timeDeliveryFromSettings) => {
  const day = dateCheck.getDay() == 0 ? 7 : dateCheck.getDay()
  const workPeriod = timeDeliveryFromSettings[day]

  return workPeriod && workPeriod.length == 2
}

export const nearestWorkingStartDate = (timeDeliveryFromSettings, currentDate) => {
  let periodData = nearestWorkingDate(timeDeliveryFromSettings, currentDate)
  let workStartDate = periodData.workDatePeriod[0]
  let date = new Date()
  const workPeriod = workStartDate.split(':')
  date.setDate(date.getDate() + periodData.shiftDay)
  date.setHours(workPeriod[0], workPeriod[1])

  return date
}

export const nearestWorkingEndDate = (timeDeliveryFromSettings, currentDate) => {
  let periodData = nearestWorkingDate(timeDeliveryFromSettings, currentDate)
  let workStartDate = periodData.workDatePeriod[1]
  let date = new Date()
  const workPeriod = workStartDate.split(':')
  date.setDate(date.getDate() + periodData.shiftDay)
  date.setHours(workPeriod[0], workPeriod[1])

  return date
}

export const nearestWorkingDate = (timeDeliveryFromSettings, currentDate) => {
  let day = currentDate.getDay() == 0 ? 7 : currentDate.getDay()
  let counterDay = 0
  let workDatePeriod = null
  let currentDayWorkPeriod = timeDeliveryFromSettings[day]

  if (currentDayWorkPeriod && currentDayWorkPeriod.length == 2) {
    const timeEndDay = currentDayWorkPeriod[1].split(':')
    let dateEndDay = new Date()
    dateEndDay.setHours(timeEndDay[0], timeEndDay[1])

    if (currentDate < dateEndDay) {
      workDatePeriod = currentDayWorkPeriod
    }
  }
  
  while (!workDatePeriod) {
    ++counterDay
    ++day

    if (day > 7)
      day = 1

    const workPeriod = timeDeliveryFromSettings[day]

    if (workPeriod && workPeriod.length == 2)
      workDatePeriod = workPeriod
  }

  return {
    workDatePeriod,
    shiftDay: counterDay
  }
}

export const toStringDateAndTime = dateToStr => {
  let date = new Date(dateToStr)
  let day = date.getDate().toString()
  day = day.length == 1 ? "0" + day : day
  let month = (date.getMonth() + 1).toString()
  month = month.length == 1 ? "0" + month : month
  let hours = date.getHours().toString()
  hours = hours.length == 1 ? "0" + hours : hours
  let minutes = date.getMinutes().toString()
  minutes = minutes.length == 1 ? "0" + minutes : minutes
  let dateStr = `${hours}:${minutes} ${day}.${month}.${date.getFullYear()}`
  return dateStr;
}

export const toStringDate = dateToStr => {
  let date = new Date(dateToStr)
  let day = date.getDate().toString()
  day = day.length == 1 ? "0" + day : day
  let month = (date.getMonth() + 1).toString()
  month = month.length == 1 ? "0" + month : month
  let hours = date.getHours().toString()

  let dateStr = `${day}.${month}.${date.getFullYear()}`
  return dateStr;
}

export const getTimePeriodByDayFromDate = (timeDeliveryFromSettings, date, dateShift) => {
  const currentDate = date
  const currentDay = currentDate.getDay() == 0 ? 7 : currentDate.getDay()

  const currentWorkPeriod = timeDeliveryFromSettings[currentDay]
  let result = {
    isHoliday: true,
    periodStart: '',
    periodEnd: '',
  }  

  if (currentWorkPeriod && currentWorkPeriod.length == 2) {
    let periodStart = currentWorkPeriod[0]
    if(dateShift && dateShift.length == 2) {
      const splitPeriod = periodStart.split(':').map(p => parseInt(p))
      splitPeriod[0] +=dateShift[0]
      splitPeriod[1] +=dateShift[1]

      periodStart = splitPeriod.join(':')
    }

    result.isHoliday = false
    result.periodStart = periodStart
    result.periodEnd = currentWorkPeriod[1]
  }

  return result
}

export const jsonToDate = value => {
  let date;
  if (value.includes("/Date")) {
    date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
  } else {
    date = new Date(value);
  }

  return date;
}