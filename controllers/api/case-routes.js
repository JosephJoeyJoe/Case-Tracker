const router = require("express").Router();
const { Case } = require("../../models");
const authenticate = require("../../utils/auth");

router.get("/", (req, res) => {
  Case.findAll()
    .then((dbCaseData) => res.json(dbCaseData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", authenticate, (req, res) => {
  Case.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCaseData) => {
      if (!dbCaseData) {
        res.status(404).json({ message: "No case found with this id!" });
        return;
      }
      res.json(dbCaseData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;