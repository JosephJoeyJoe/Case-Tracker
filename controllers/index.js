// const for apiRoutes = require('./api');
// const for homepage = require('./homepage-routes');
// const for dashboard = require('./user-dashboard-routes');
const router = require("express").Router();

// router.use('/', homepage);
// router.use('/api', instest api const); 
// router.use('/dashboard', dashboard);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
