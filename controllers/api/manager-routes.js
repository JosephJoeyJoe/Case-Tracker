const router = require("express").Router();
const { Manager } = require("../../models");

router.get("/", (req, res) => {
  Manager.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbManagerData) => res.json(dbManagerData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Manager.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbManagerData) => {
      req.session.save(() => {
        req.session.manager_id = dbManagerData.id;
        req.session.username = dbManagerData.username;
        req.session.loggedIn = true;

        res.json(dbManagerData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  Manager.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbManagerData) => {
    if (!dbManagerData) {
      res.status(400).json({ message: "No manager with that email address!" });
      return;
    }

    const validPassword = dbManagerData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.manager_id = dbManagerData.id;
      req.session.username = dbManagerData.username;
      req.session.loggedIn = true;

      res.json({ user: dbManagerData, message: "You are now logged in!" });
    });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
