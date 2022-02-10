const { Manager } = require("../models");

const managerData = [{}];

const seedManagers = () => Manager.bulkCreate(managerData);

module.exports = seedManagers;
