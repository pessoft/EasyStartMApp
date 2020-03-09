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
  let workDays = {};
  let freeDays = [];

  for (let dayId in timeDelivery) {
    let timePeriod = timeDelivery[dayId];

    if (timePeriod == null ||
      timePeriod.length != 2) {
      freeDays.push(DaysShort[dayId]);
    } else {
      let periodStr = timePeriod.join(" - ");

      if (!workDays[periodStr]) {
        workDays[periodStr] = [];
      }

      workDays[periodStr].push(DaysShort[dayId]);
    }
  }

  let daysStr = [];

  for (let period in workDays) {
    let str = `${workDays[period].join()}: ${period}`;

    daysStr.push(str);
  }

  if (freeDays.length != 0) {
    daysStr.push(`${freeDays.join()}: Выходной`);
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
    splitEndPeriod[0] = splitEndPeriod[0] == 0 ? 24 : splitEndPeriod[0]

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

export const nearestWorkingDate = (timeDeliveryFromSettings, currentDate) => {
  let day = currentDate.getDay() == 0 ? 7 : currentDate.getDay()
  let counterDay = 0
  

  let workDate = null
  while(!workDate)
  {
    ++counterDay
    ++day

    if(day > 7)
    day = 1

    const workPeriod = timeDeliveryFromSettings[day]
    
    if(workPeriod && workPeriod.length == 2)
    workDate = workPeriod[0]
  }  
  
  let date = new Date()
  const workPeriod = workDate.split(':')
  date.setDate(date.getDate() + counterDay)
  date.setHours(workPeriod[0], workPeriod[1])

  return date
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

export const getTimePeriodByDayFromDate = (timeDeliveryFromSettings, date) => {
  const currentDate = date
  const currentDay = currentDate.getDay() == 0 ? 7 : currentDate.getDay()

  const currentWorkPeriod = timeDeliveryFromSettings[currentDay]
  let result = {
    isHoliday: true,
    periodStart: '',
    periodEnd: '',
  }

  if (currentWorkPeriod && currentWorkPeriod.length == 2) {
    result.isHoliday = false
    result.periodStart = currentWorkPeriod[0]
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