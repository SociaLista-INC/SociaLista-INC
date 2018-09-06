require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const passport = require("passport");
const strategy = require("./strategy");
const {
  getMostRecentLikes,
  getMostRecentComments,
  getMostRecentFollowers
} = require("./Controllers/exploreControllers");
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
  createComment,
  updateComment,
  deleteComment,
  getAllImagesGallery
} = require("./Controllers/postsControllers");

const {
  getAllStories,
  createStory,
  deleteStory
} = require("./Controllers/storiesControllers");

const app = express();
app.use(bodyParser.json());

//---------------AWS setup----------------------

const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");

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
app.put("/api/post/comment/:comment_id", updateComment);
app.delete("/api/post/comment/:comment_id", deleteComment);

//---------------Gallery Endpoints -----------------------
app.get("/api/getgallery/images", getAllImagesGallery);

//---------------Explore Endpoints------------------------

app.get("/api/getrecentlikes", getMostRecentLikes);
app.get("/api/getrecentcomments", getMostRecentComments);
app.get("/api/getrecentfollowers", getMostRecentFollowers);

//----------------Stories Endpoints-----------------------
app.get("/api/getstories/:auth_id", getAllStories);
app.post("/api/story/create", createStory);
app.delete("/api/story/:story_id", deleteStory);

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

//-------------------Aws info-------------------------------
// using credentials to access AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// s3 function for uploading file
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

// s3 get endpoint
// app.get("/media", async (req, res) => {
//   var response = await s3
//     .listObjectsV2({
//       Bucket: process.env.S3_BUCKET
//     })
//     .promise();
//   console.log("this is loggining", response);
//   res.status(200).send(response.Contents);
// });

// s3 post endpoint
app.post("/api/post-upload-file", (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `${timestamp}`;
      const data = await uploadFile(buffer, fileName, type);
      console.log("THIS IS DATA", data.Location);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

//----------------port info---------------------------------

const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening ${port}`);
});
