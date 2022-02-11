const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const {Employee, Case, Manager} = require('../models');

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
    res.render('dashboard', {
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
        const oneCase = caseData.get({
            plain: true
        });
        res.render('one-case', {
            oneCase,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.loggedIn(err);
        res.status(500).json(err);
    })
})

router.get('*', (req, res) => {
    res.status(404).send('Cannot access');
});

module.exports = router;