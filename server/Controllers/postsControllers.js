const getAllPosts = (req, res, next) => {
  const db = req.app.get("db");
  db.get_posts()
    .then(post => res.status(200).send(post))
    .catch(e => res.status(500).send("somethingiswrong"));
};

const deletePost = (req, res, next) => {
  let { post_id } = req.params;

  const db = req.app.get("db");

  db.delete_by_postid(post_id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

module.exports = {
  getAllPosts,
  deletePost
};
