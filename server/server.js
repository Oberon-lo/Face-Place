require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const aws = require("aws-sdk");
const uuid = require("uuid/v4");
const nodemailer = require("./controllers/nodemailer.js");
const auth = require("./controllers/authController.js");
const postCtrl = require("./controllers/postController.js");
const comCtrl = require('./controllers/comController.js');
const userCtrl = require("./controllers/userController.js");
const s3Ctrl = require('./controllers/s3.js');

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


// ENDPOINTS \\

// DEV TOOLS \\
app.get("/api/users", userCtrl.getAllUsers);

// NODEMAILER / s3 \\
app.post("/api/send", nodemailer.nodemailer);
app.get("/sign-s3", s3Ctrl.s3);



// AUTH / SESSION \\
app.post("/api/register", auth.register);
app.post("/api/login", auth.login);
app.delete("/api/logout", auth.logout);
app.put("/api/email/:id", auth.emailVerif);
app.get("/api/session", userCtrl.getUserInfo)

// USER EDIT ENDPOINTS \\
app.put("/api/name/:id", userCtrl.userName);
app.put("/api/profilePic/:id", userCtrl.prof_pic);
app.put("/api/bio/:id", userCtrl.bio);
app.put("/api/cover/:id", userCtrl.coverPic);

// POST ENDPOINTS \\
app.get('/posts/all/:user_id', postCtrl.getAll);
app.get('/posts/byUser/:user_id', postCtrl.getUserPosts);
app.get('/post/images/:post_id', postCtrl.getPostImg);
app.post('/posts/newPost', postCtrl.makePost);
app.put('/post/:post_id', postCtrl.editPost);
app.post('/post/img/:post_id', postCtrl.addPostImg );
app.delete('/post/img/:post_img_id', postCtrl.deletePostImg);
app.delete('/post/:post_id', postCtrl.deletePost);

// COMMENT ENDPOINTS \\
app.get('/post/comments/:post_id', comCtrl.getCom);
app.get('/post/comments/img/:com_id', comCtrl.getComImg);
app.post('/post/newCom/:post_id', comCtrl.makeCom);
app.put('/post/comment/:com_id', comCtrl.editCom);
// app.delete('/post/comment/img/:comment_img_id', comCtrl.deleteComImg);
app.delete('/post/comment/:com_id', comCtrl.deleteCom);


massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("TAC-COM ONLINE");
  app.listen(SERVER_PORT, () =>
    console.log(`${SERVER_PORT} BOTTLES OF ON THE WALL!!!`)
  );
});
