const Case = require("./Case");
const Employee = require("./Employee");
const Manager = require("./Manager");

Case.belongsTo(Employee, {
  foreignKey: "case_id",
});

Manager.hasMany(Employee, {
  foreignKey: "",
});

module.exports = { Case, Employee, Manager };
