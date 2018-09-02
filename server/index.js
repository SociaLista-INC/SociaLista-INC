require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const passport = require("passport");
const strategy = require("./strategy");
const { logout, login, getUser } = require("./auth_controller");
const {
  getProfile,
  addFollower,
  getNumOfFollowers,
  deleteFollow,
  getIfFollowing,
  getListOfFollowers,
  getEachUserPosts
} = require("./Controllers/profileControllers");
const {
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
  createComment
} = require("./Controllers/postsControllers");
const app = express();
app.use(bodyParser.json());

//---------------massive------------------------

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(e => console.log(e));

//---------------session-------------------------

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2 //2 weeks
    }
  })
);

//----------------Passport-----------------

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
  // console.log("first", user);
  const db = app.get("db");
  db.get_user_by_authid(user.id)
    .then(response => {
      if (!response[0]) {
        // console.log("loooooog", user);
        db.add_user_by_authid([
          user.displayName,
          user.id,
          `https://graph.facebook.com/${user.id.substring(
            9
          )}/picture?width=9999`
        ])
          .then(res => {
            session.auth_id = res[0].auth_id;
            // console.log("new", session.auth_id);
            done(null, res[0]);
          })
          .catch(err => done(err, null));
      } else {
        session.auth_id = response[0].auth_id;
        return done(null, response[0]);
      }
    })
    .catch(err => done(err, null));
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
//------------------Auth Endpoints--------------------
app.get("/login", login);
app.post("/api/logout", logout);
app.get("/api/me", getUser);

//----------------DashBoard Endpoints--------------------
app.get("/api/getposts", getAllPosts);
app.delete("/api/post/:post_id", deletePost);
app.post("/api/post/create", createPost);
app.post("/api/post/image/create", createPostImage);
app.put("/api/post/:post_id", updatePost);
app.post("/api/post/like/:post_id", likePost);
app.get("/api/getlikes", getAllLikesPost);
app.delete("/api/like/:post_id/:auth_id", deleteLikePost);
app.get("/api/post/userlist/like/:post_id", getUserListlikePost);
app.get("/api/post/comments/:post_id", getUserCommentPost);
app.post("/api/post/comment", createComment);

//----------------user profile Endpoints------------------

app.get("/api/getprofileinfo/:auth_id", getProfile);
app.get("/api/numoffollowers/:auth_id", getNumOfFollowers);
app.get("/api/getfollowinginfo/:auth_id/:followed_by", getIfFollowing);
app.get("/api/getlistoffollowers/:auth_id", getListOfFollowers);
app.get("/api/getuserposts/:auth_id", getEachUserPosts);
app.post("/api/followuser/:auth_id/:followed_by", addFollower);
app.post("/api/post/like/:post_id", likePost);
app.delete("/api/unfollowuser/:auth_id/:followed_by", deleteFollow);
app.delete("/api/like/:post_id/:auth_id", deleteLikePost);
app.delete("/api/post/:post_id", deletePost);

//---------------Session Endpoints------------------------

app.get("/api/session", (req, res) =>
  res.status(200).send({ auth_id: session.auth_id })
);

//----------------port info---------------------------------

const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening ${port}`);
});
