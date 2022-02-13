const router = require("express").Router();
const { Manager } = require("../../models");
// const withAuth = require('../../utils/auth');

router.get("/", (req, res) => {
  Manager.findAll()
    .then((dbManagerData) => res.json(dbManagerData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
