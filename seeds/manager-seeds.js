const { Manager } = require("../models");

const managerData = [
  {
    username: "jpmorgan",
    email: "jp@gmail.com",
    password: "password123",
  },
];

const seedManagers = () => Manager.bulkCreate(managerData);

module.exports = seedManagers;
