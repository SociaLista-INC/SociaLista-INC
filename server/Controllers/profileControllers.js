const getProfile = (req, res, next) => {
  // console.log(req.params.auth_id);
  const db = res.app.get("db");
  db.get_user_by_authid([req.params.auth_id])
    .then(response => res.status(200).send(response))
    .catch(e => res.status(500).send("Something is wrong"));
};

const addFollower = (req, res, next) => {
  // console.log(req.params.auth_id, req.params.followed_by);
  const db = res.app.get("db");
  db.add_new_follower([req.params.auth_id, req.params.followed_by])
    .then(response => res.status(200).send(response))
    .catch(e => {
      console.log(e);
      res.status(500).send("Something is wrong");
    });
};

const getIfFollowing = (req, res, next) => {
  console.log(req.params.auth_id, req.params.followed_by);
  const db = res.app.get("db");
  db.get_following_info([req.params.auth_id, req.params.followed_by])
    .then(response => res.status(200).send(response))
    .catch(e => res.status(500).send("Something is wrong"));
};

const getNumOfFollowers = (req, res, next) => {
  // console.log(req.params.auth_id);
  const db = res.app.get("db");
  db.get_num_of_followers([req.params.auth_id])
    .then(response => res.status(200).send(response))
    .catch(e => res.status(500).send("Something is wrong"));
};

const deleteFollow = (req, res, next) => {
  const db = res.app.get("db");
  // console.log(req.params.auth_id);

  db.delete_follow([req.params.auth_id, req.params.followed_by])
    .then(() => res.status(200).send("Unfollowed"))
    .catch(e => res.status(500).send("Something is wrong"));
};

const getListOfFollowers = (req, res, next) => {
  // console.log(req.params.auth_id);
  const db = res.app.get("db");
  db.get_list_of_followers([req.params.auth_id])
    .then(response => res.status(200).send(response))
    .catch(e => res.status(500).send("Something is wrong"));
};

const getEachUserPosts = (req, res, next) => {
  console.log(req.params.auth_id);
  const db = res.app.get("db");
  db.get_posts_by_user([req.params.auth_id])
    .then(response => res.status(200).send(response))
    .catch(e => res.status(500).send("Something is wrong"));
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

const deleteLikePost = (req, res, next) => {
  let { post_id, auth_id } = req.params;
  const db = req.app.get("db");

  db.delete_like_by_postid([post_id, auth_id])
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => res.status(500).send(err));
};

module.exports = {
  getProfile,
  addFollower,
  getNumOfFollowers,
  deleteFollow,
  getIfFollowing,
  getListOfFollowers,
  getEachUserPosts,
  likePost,
  deleteLikePost
};
