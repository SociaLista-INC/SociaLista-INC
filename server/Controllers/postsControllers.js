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

const createPost = (req, res, next) => {
  let { auth_id, content } = req.body;

  const db = req.app.get("db");

  db.create_post([auth_id, content])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

const createPostImage = (req, res, next) => {
  // console.log(req.body);
  let { post_id, image_url } = req.body;

  const db = req.app.get("db");

  db.create_post_image([post_id, image_url])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

const updatePost = (req, res, next) => {
  let { post_id } = req.params;
  let { content } = req.body;
  // console.log(post_id, content);
  const db = req.app.get("db");

  db.update_post_by_postid([post_id, content])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

module.exports = {
  getAllPosts,
  deletePost,
  createPost,
  createPostImage,
  updatePost
};
