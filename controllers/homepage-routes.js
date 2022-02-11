const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
// const authenticate = require();
const sequelize = require('../config/connection');
const {Employee, Case, Manager} = require('../models');

router.get('/', authenticate => {
    Case.findAll({
        where: {
            user_id: req.session.user_id
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
        const cases = caseData.map(cases => cases.get({
            plain: true
        }));
    res.render('dashboard', {
        cases,
        loggedIn: true,
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('*', (req, res) => {
    res.status(404).send('Cannot access');
});

module.exports = router;
