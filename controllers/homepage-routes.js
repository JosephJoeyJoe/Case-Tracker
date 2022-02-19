const router = require("express").Router();
// const req = require("express/lib/request");
// const res = require("express/lib/response");
const sequelize = require("../config/connection");
const { Employee, Case, Manager } = require("../models");

router.get('/', (req, res) => {
  Case.findAll({
      attributes: ['id'],
      include: [{
          model: Employee,
          attributes: ['id', 'case_id', 'manager_id', 'last_day', 'symptom_start'],
          include: {
              model: Manager,
              attributes: ['id']
          }
      }]
  })
  .then(caseData => {
      const cases = caseData.map(cases => cases.get({
          plain: true
      }));
  res.render('login', {
      cases,
      loggedIn: req.session.loggedIn
      });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
})

router.get('/case/:id', (req, res) => {
  Case.findOne({
    where: {
        id: req.params.id
      },
      attributes: ['id'],
      include: [{
          model: Employee,
          attributes: ['id', 'case_id', 'manager_id', 'last_day', 'symptom_start'],
          include: {
              model: Manager,
              attributes: ['id']
          }
      }]
  })
  .then(caseData => {
      if (!caseData) {
          res.status(404).json({ message: 'No case found with that id'});
          return;
      }
      const oneCase = caseData.get({plain: true});
      res.render('one-case', {oneCase, loggedIn: req.session.loggedIn});
  })
  .catch(err => {
      console.loggedIn(err);
      res.status(500).json(err);
  })
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });
  
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/login');
      return;
    }
  
    res.render('signup');
  });
module.exports = router;