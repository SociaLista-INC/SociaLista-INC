const getProfile = (req, res, next) => {
  console.log(req.params.auth_id);
  const db = res.app.get("db");
  db.get_user_by_authid([req.params.auth_id])
    .then(response => res.status(200).send(response))
    .catch(e => res.status(500).send("Something is wrong"));
};
const addFollower = (req, res, next) => {
  console.log(req.params.auth_id, req.params.followed_by);
  const db = res.app.get("db");
  db.add_new_follower([req.params.auth_id, req.params.followed_by])
    .then(response => res.status(200).send(response))
    .catch(e => {
      console.log(e);
      res.status(500).send("Something is wrong");
    });
};

module.exports = {
  getProfile,
  addFollower
};
