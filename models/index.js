
const Case = require("./Case");
const Employee = require("./Employee");
const Manager = require("./Manager");

Case.belongsTo(Employee, {
  foreignKey: "case_id",
  constraints: false
});

Manager.hasMany(Employee, {
    foreignKey: 'manager_id',
    constraints: false
});
Employee.belongsTo(Manager, {
  foreignKey: 'manager_id',
  constraints: false
});


module.exports = {Case, Employee, Manager};

