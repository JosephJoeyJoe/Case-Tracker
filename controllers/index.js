const apiRoutes = require('./api');
const homepage = require('./homepage-routes');
const dashboard = require('./user-dashboard-routes');
const router = require("express").Router();

router.use('/', homepage);
router.use('/api', apiRoutes); 
router.use('/dashboard', dashboard);   
                   

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
