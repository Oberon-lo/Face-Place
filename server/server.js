require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const aws = require("aws-sdk");
const uuid = require("uuid/v4");
const nodemailer = require("./controllers/nodemailer.js");
const auth = require("./controllers/authController.js");
const postCtrl = require('./controllers/postController.js');
const userCtrl = require('./controllers/userController.js');

const {
  SESSION_SECRET,
  PASSWORD,
  SERVER_PORT,
  CONNECTION_STRING
} = process.env;

const app = express();
// TOP LEVEL MIDDLEWARE \\
app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("TAC-COM ONLINE");
  app.listen(SERVER_PORT, () =>
    console.log(`${SERVER_PORT} BOTTLES OF (undefined) ON THE WALL!!!`)
  );
});

// ENDPOINTS \\

// NODEMAILER \\
app.post("/api/send", nodemailer.nodemailer);

// AUTH / SESSION \\
app.post("/api/register", auth.register);
app.post("/api/login", auth.login);
app.delete("/api/logout", auth.logout);
app.put("/api/email", auth.emailVerif);

// USER EDIT ENDPOINTS \\
app.put('/api/name', auth.specificUser, userCtrl.userName);
app.put('/api/profilePic', auth.specificUser, userCtrl.prof_pic);
app.put('/api/bio', auth.specificUser, userCtrl.bio);
app.put('/api/cover_pic', auth.specificUser, userCtrl.coverPic);

// POST ENDPOINTS \\
app.get('/posts/all', postCtrl.getAll);