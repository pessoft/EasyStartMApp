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