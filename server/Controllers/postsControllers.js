const getAllPosts = (req, res, next) => {
  const db = req.app.get("db");
  db.get_posts()
    .then(post => res.status(200).send(post))
    .catch(e => res.status(500).send("somethingiswrong"));
};

module.exports = {
  getAllPosts
};
