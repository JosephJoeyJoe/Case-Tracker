const { Case } = require("../models");

const caseData = [{}];

const seedCases = () => Case.bulkCreat(caseData);

module.exports = seedCases;
