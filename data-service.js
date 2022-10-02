var employees = [];
var departments = [];
var fs = require("fs");


module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/employees.JSON", (err, data) => {
      if (err) reject("unable to read file");
      employees = JSON.parse(data);
      resolve();
    });
    fs.readFile("./data/departments.JSON", (err, data) => {
      if (err) reject("unable to read file");
      departments = JSON.parse(data);
    });
    resolve();
  });
};

module.exports.getAllEmployees = function () {
  return new Promise((resolve, reject) => {
    if (employees.length > 0) resolve(employees);
    else reject("no results returned");
  });
};

module.exports.getManagers = function () {
  return new Promise((resolve, reject) => {
    const manager = employees.filter((emp) => {
      return emp.isManager === true;
    });
    if (manager.length > 0) resolve(manager);
    else reject("no results returned");
  });
};

module.exports.getDepartments = function () {
  return new Promise((resolve, reject) => {
    if (departments.length > 0) resolve(departments);
    else reject("no results returned");
  });
};