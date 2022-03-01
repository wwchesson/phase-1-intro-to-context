let createEmployeeRecord = function (row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

let createEmployeeRecords = function (employeeRecords) {
  return employeeRecords.map(function (row) {
    return createEmployeeRecord(row);
  });
};

let createTimeInEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

let createTimeOutEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

let hoursWorkedOnDate = function (employee, targetDate) {
  let startEvent = employee.timeInEvents.find(function (e) {
    return e.date === targetDate;
  });

  let endEvent = employee.timeOutEvents.find(function (e) {
    return e.date === targetDate;
  });

  return (endEvent.hour - startEvent.hour) / 100;
};

let wagesEarnedOnDate = function (employee, targetDate) {
  return parseInt(
    hoursWorkedOnDate(employee, targetDate) * employee.payPerHour,
    10
  );
};

let allWagesFor = function (employee) {
  let allDates = employee.timeInEvents.map(function (e) {
    return e.date;
  });

  let payOwed = allDates.reduce(function (accumulator, dates) {
    return wagesEarnedOnDate(employee, dates) + accumulator;
  }, 0);

  return payOwed;
};

function calculatePayroll(allEmployeeRecords) {
  return allEmployeeRecords.reduce(function (accumulator, record) {
    return accumulator + allWagesFor(record);
  }, 0);
}
