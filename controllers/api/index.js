const router = require("express").Router();

const caseRoutes = require("./case-routes.js");
const employeeRoutes = require("./employee-routes.js");
const managerRoutes = require("./manager-routes.js");

router.use("/cases", caseRoutes);
router.use("/employees", employeeRoutes);
router.use("/managers", managerRoutes);

module.exports = router;
