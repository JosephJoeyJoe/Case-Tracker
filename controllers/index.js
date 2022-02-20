const homeRoutes = require('./homepage-routes');
const dashboardRoutes = require('./user-dashboard-routes');
const apiRoutes = require('./api');
const router = require('express').Router();


router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;