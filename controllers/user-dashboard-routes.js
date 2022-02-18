const router = require('express').Router();
const authenticate = require("../utils/auth");
const {Employee, Case, Manager} = require('../models');

router.get("/", authenticate, (req, res) => {
    Manager.findAll({
      where: {
        id: req.session.id,
      },
  
      attributes: ["id"],
      include: [
        {
          model: Employee,
          attributes: [
            "id",
            "case_id",
            "manager_id",
            "last_day",
            "symptom_start",
          ],
          include: {
            model: Case,
            attributes: ["id"],
          },
        },
      ],
    })
      .then((caseData) => {
        const cases = caseData.map((cases) =>
          cases.get({
            plain: true,
          })
        );
        res.render("/dashboard", {
          cases,
          loggedIn: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// router.get('*', (req, res) => {
//     res.status(404).send('Cannot access');
// });

module.exports = router;