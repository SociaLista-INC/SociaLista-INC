const getMostRecentLikes = (req, res, next) => {
  const db = res.app.get("db");
  db.get_most_recent_likes()
    .then(response => res.status(200).send(response))
    .catch(e => res.status(500).send("Something is wrong"));
};

module.exports = {
  getMostRecentLikes
};
