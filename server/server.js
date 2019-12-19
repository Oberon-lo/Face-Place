require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const aws = require("aws-sdk");
const uuid = require("uuid/v4");
const nodemailer = require("./controllers/nodemailer.js");
const auth = require("./controllers/authController.js");
const postCtrl = require('./controllers/postController.js');
const comCtrl = require('./controllers/comController.js');

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


// NODEMAILER \\
app.post("/api/send", nodemailer.nodemailer);

// AUTH / SESSION \\
app.post("/api/register", auth.register);
app.post("/api/login", auth.login);
app.delete("/api/logout", auth.logout);

// POST ENDPOINTS \\
app.get('/posts/all', postCtrl.getAll);
app.get('/posts/byUser/:user_id', postCtrl.getUserPosts);
app.get('/post/images/:post_id', postCtrl.getPostImg);
app.post('/posts/newPost', postCtrl.makePost);
app.put('/post/:post_id', postCtrl.editPost);
app.delete('/post/:post_id', postCtrl.deletePost);

// COMMENT ENDPOINTS \\
app.get('/post/comments/:post_id', comCtrl.getCom);
app.post('/post/newCom/:post_id', comCtrl.makeCom);
app.put('/post/comment/:com_id', comCtrl.editCom);
app.delete('/post/comment/:com_id', comCtrl.deleteCom);

// POST ENDPOINTS \\
app.get('/posts/all', postCtrl.getAll);


massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("TAC-COM ONLINE");
  app.listen(SERVER_PORT, () =>
    console.log(`${SERVER_PORT} BOTTLES OF (undefined) ON THE WALL!!!`)
  );
});