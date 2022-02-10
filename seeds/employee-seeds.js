const { Employee, Case, Manager } = require("../models");

const employeeData = [
  {
    case_id: "1",
    manager_id: "20",
    last_day: "2020-01-30",
    symptom_start: "2020-01-28",
  },
];

const seedEmployees = () =>
  Employee.bulkCreate(employeeData, { individualHooks: true });

module.exports = seedEmployees;
