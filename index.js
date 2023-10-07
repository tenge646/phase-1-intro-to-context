// Your code here
function createEmployeeRecord(employeeInfo) {
    return {
      firstName: employeeInfo[0],
      familyName: employeeInfo[1],
      title: employeeInfo[2],
      payPerHour: employeeInfo[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10),
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10),
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find((event) => event.date === date);
    const timeOut = employee.timeOutEvents.find((event) => event.date === date);
  
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const pay = hoursWorked * employee.payPerHour;
    return pay;
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employee, date);
    }, 0);
    return totalWages;
  }
  
  function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
    return totalPayroll;
  }
  
  const employeeData = [
    ["John", "Doe", "Developer", 25],
    ["Jane", "Smith", "Designer", 30],
  ];
  
  const employees = createEmployeeRecords(employeeData);
  
  createTimeInEvent(employees[0], "2023-10-07 0800");
  createTimeOutEvent(employees[0], "2023-10-07 1700");
  
  console.log(allWagesFor(employees[0])); // Calculate wages for the first employee
  console.log(calculatePayroll(employees)); // Calculate total payroll for all employees
  