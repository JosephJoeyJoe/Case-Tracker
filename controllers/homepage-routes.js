const router = require("express").Router();
<<<<<<< HEAD
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
=======
const { Router } = require("express");
const sequelize = require("../config/connection");
const { Employee, Manager } = require("../models");

router.get("/", (req, res) => {
  Employee.findAll({
    attributes: ["id", "manager_id", "last_day", "symptom_start"],
    include: {
      model: Manager,
      attributes: ["id"],
    },
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get("/employee/:id", (req, res) => {
  Employee.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "manager_id", "last_day", "symptom_start"],
        include: {
          model: Manager,
          attributes: ["id"],
        },
      })
    .then((employeeData) => {
      if (!employeeData) {
        res.status(404).json({ message: "No employee found with that id" });
        return;
      }
      const oneEmployee = employeeData.get({ plain: true });
      res.render("one-employee", { oneEmployee, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.loggedIn(err);
      res.status(500).json(err);
    });
});


router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

//changes route to /dashboard instead of /
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

module.exports = router;
>>>>>>> 8664a5c34fc3332fd5049b3de92d3eeab15a342d
