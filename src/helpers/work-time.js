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

export const isWorkTime = operationMode => {
  const currentDate = new Date()
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
    }
  }

  return false
}