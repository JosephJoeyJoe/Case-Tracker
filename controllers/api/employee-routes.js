const router = require("express").Router();
const { Employee } = require("../../models");

// get all employees
router.get("/", (req, res) => {
  Employee.findAll({})
    // .then((dbEmployeeData) => res.json(dbEmployeeData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Employee.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Case,
        attributes: ["id"],
      },
      {
        model: Manager,
        attributes: ["id"],
      },
    ],
  })
    .then((dbEmployeeData) => {
      if (!dbEmployeeData) {
        res.status(404).json({ message: "No employee found with this id" });
        return;
      }
      res.json(dbEmployeeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Employee.create({
    last_day: req.body.last_day,
    symptom_start: req.body.symptom_start,
  })
    .then((dbEmployeeData) => res.json(dbEmployeeData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
