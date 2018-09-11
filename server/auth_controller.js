const passport = require("passport");
const logout = (req, res) => {
  // console.log(req.session);
  req.session.destroy(() => {
    res.redirect(process.env.REACT_APP_CLIENT);
  });
};

const getUser = (req, res) => {
  const db = req.app.get("db");
  if (!req.user) {
    res.status(500).send({ message: "Not Logged In" });
  } else {
    db.get_user_by_authid(req.user.auth_id).then(results => {
      // console.log("resssssssss", results);
      res.status(200).send(results[0]);
    });
  }
};

const login = passport.authenticate("auth0", {
  successRedirect: process.env.SUCCESS,
  failureRedirect: process.env.FAIL
});

module.exports = {
  logout,
  login,
  getUser
};
