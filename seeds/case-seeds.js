const { Case } = require("../models");

const caseData = [{}];

const seedCases = () => Case.bulkCreate(caseData);

module.exports = seedCases;
