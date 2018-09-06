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
      res.status(200).send("response");
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

const likePost = (req, res, next) => {
  let { post_id } = req.params;

  let { auth_id, rate } = req.body;

  const db = req.app.get("db");

  db.add_likes_by_postid([post_id, auth_id, rate])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

const getAllLikesPost = (req, res, next) => {
  const db = req.app.get("db");

  db.get_postLikes()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

const deleteLikePost = (req, res, next) => {
  let { post_id, auth_id } = req.params;
  const db = req.app.get("db");

  db.delete_like_by_postid([post_id, auth_id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

const getUserListlikePost = (req, res, next) => {
  let { post_id } = req.params;

  const db = req.app.get("db");

  db.get_listofusers_postLikes([post_id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

const getUserCommentPost = (req, res, next) => {
  let { post_id } = req.params;

  const db = req.app.get("db");

  db.get_comments_postid([post_id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

const createComment = (req, res, next) => {
  let { auth_id, post_id, comment } = req.body;

  const db = req.app.get("db");

  db.create_comment([auth_id, post_id, comment])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

const updateComment = (req, res, next) => {
  let { comment_id } = req.params;
  let { comment } = req.body;

  const db = req.app.get("db");

  db.update_comment_by_id([comment_id, comment])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

const deleteComment = (req, res, next) => {
  let { comment_id } = req.params;

  const db = req.app.get("db");

  db.delete_comment_by_id([comment_id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

const getAllImagesGallery = (req, res, next) => {
  const db = req.app.get("db");
  db.get_gallery_image_by_postid()
    .then(post => res.status(200).send(post))
    .catch(e => res.status(500).send("somethingiswrong"));
};

const getHashTags = (req, res, next) => {
  const axios = require("axios");
  axios
    .get(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=8d34de7e65e74b73849435f89f395b6e"
    )
    .then(results => {
      console.log(results);

      res.status(200).send(results);
    })
    .catch(e => res.status(500).send("wrong"));
};

module.exports = {
  getAllPosts,
  deletePost,
  createPost,
  createPostImage,
  updatePost,
  likePost,
  getAllLikesPost,
  deleteLikePost,
  getUserListlikePost,
  getUserCommentPost,
  createComment,
  updateComment,
  deleteComment,
  getAllImagesGallery,
  getHashTags
};
