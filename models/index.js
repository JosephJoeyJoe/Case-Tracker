
//const Case = require("./Case");
const Employee = require("./Employee");
const Manager = require("./Manager");

// Case.belongsTo(Employee, {
//   foreignKey: "case_id",
//  // constraints: false
// });
// Employee.hasOne( Case,{
//   foreignKey:'case_id'
// })
Manager.hasMany(Employee, {
    foreignKey: 'manager_id',
   // constraints: false
});
Employee.belongsTo(Manager, {
  foreignKey: 'id',
  onDelete:'CASCADE',
 // constraints: false
});


module.exports = { Employee, Manager};

