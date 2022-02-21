const router = require('express').Router();
const authenticate = require("../utils/auth");
const {Employee, Manager} = require('../models');

router.get('/', authenticate, (req, res) => {
    Manager.findAll({
      where: {
        id: req.session.id,
      },
  
      attributes: ['id'],
      include: [
        {
          model: Employee,
          attributes: ['id', 'case_id', 'manager_id', 'last_day', 'symptom_start'],
        },
      ],
    })
    .then(managerData => {
      const managers = managerData.map(manager => manager.get({
        plain: true
      }));
    res.render('dashboard', {
      managers,
      loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });

  module.exports = router;