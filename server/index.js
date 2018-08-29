require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const passport = require("passport");
const strategy = require("./strategy");
const { logout, login, getUser } = require("./auth_controller");
const {
  getAllPosts,
  deletePost,
  createPost
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
  //   console.log("first", user);
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
        // console.log("loooooog", response);
        session.auth_id = response[0].auth_id;
        // console.log("ELSE", session.auth_id);
        return done(null, response[0]);
      }
    })
    .catch(err => done(err, null));
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
//------------------Auth end points--------------------
app.get("/login", login);
app.post("/api/logout", logout);
app.get("/api/me", getUser);

//----------------DashBoard Endpoints--------------------
app.get("/api/getposts", getAllPosts);
app.delete("/api/post/:post_id", deletePost);
app.post("/api/post/create", createPost);

//---------------Session Endpoints------------------------
app.get("/api/session", (req, res) =>
  res.status(200).send({ auth_id: session.auth_id })
);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening ${port}`);
});
