const router = require("express").Router();
const sequelize = require("../config/connection");
const { Employee, Manager } = require("../models");

router.get('/', (req, res) => {
  Employee.findAll({
    attributes: ['id', 'manager_id', 'last_day', 'symptom_start'],
    include: [{
      model: Manager,
      attributes: ['id', 'username', 'email', 'password']
    }]
  })
  .then(employeeCases => {
    const employees = employeeCases.map(employee => employee.get({
    }));
  res.render('dashboard', {
    employees,
    loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

router.get('/employee/:id', (req, res) => {
  Employee.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'manager_id', 'last_day', 'symptom_start'],
    include: [{
      model: Manager,
      attributes: ['id', 'username', 'email', 'password']
    }]
  })
  .then(employeeCases => {
    if (!employeeCases) {
      res.status(404).json({ message: 'No employee found with that id'});
      return;
    }
  })
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signup');
  });
  
module.exports = router;