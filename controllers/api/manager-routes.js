const router = require("express").Router();
const { Manager,Case,Employee } = require("../../models");

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

router.get("/:id", (req, res) => {
    Manager.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id
      },
      include:[{ 
        model: Employee,
          attributes: ['id', 'case_id', 'manager_id', 'last_day', 'symptom_start']
      
      }]
    })  .then(dbManagerData=> {
        if (!dbManagerData) {
          res.status(404).json({ message: 'No Manger found with this id' });
          return;
        }
        res.json(dbManagerData);
      })
      .catch(err => {
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
    }
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
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  
    // pass in req.body instead to only update what's passed through
    Manager.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbManagerData=> {
        if (!dbManagerData) {
          res.status(404).json({ message: 'No Manager found with this id' });
          return;
        }
        res.json(dbManagerData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.delete('/:id', (req, res) => {
    Manager.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbManagerData => {
        if (!dbManagerData) {
          res.status(404).json({ message: 'No Manager found with this id' });
          return;
        }
        res.json(dbManagerData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  
module.exports = router;
