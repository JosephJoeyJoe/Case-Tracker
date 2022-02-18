const authenticate = (req, res, next) => {
  if (!req.session.manager_id) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

module.exports = authenticate;
