const router = require("express").Router();
const authenticate = require("../../utils/auth");
const { Employee, Case, Manager } = require("../../models");

// get all employees
router.get("/", (req, res) => {
  Employee.findAll({})
     .then((dbEmployeeData) => res.json(dbEmployeeData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Employee.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
        "id",
        "case_id",
        "manager_id",
        "last_day",
        "symptom_start",
      ],
    
  })
    .then((dbEmployeeData) => {
      if (!dbEmployeeData) {
        res.status(404).json({ message: "No employee found with this id" });
        return;
      }
      res.json(dbEmployeeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//needs to be looked at -CHANGED THE ROUTE TO SIGNUP
router.post("/signup", authenticate,(req, res) => {
  Employee.create({
    last_day: req.body.last_day,
    symptom_start: req.body.symptom_start,
  })
 
    .then((dbEmployeeData) => res.json(dbEmployeeData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.put('/:id', authenticate, (req, res) => {
    Post.update( req.body,
    
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbEmployeeData => {
        if (!dbEmployeeData) {
          res.status(404).json({ message: 'No Employee found with this id' });
          return;
        }
        res.json(dbEmployeeData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });
    
    router.delete('/:id', authenticate, (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbEmployeeData => {
        if (!dbEmployeeData) {
          res.status(404).json({ message: 'No Employee found with this id' });
          return;
        }
        res.json(dbEmployeeData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });
module.exports = router;
