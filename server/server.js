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
const chatCtrl = require("./controllers/chatController");
const s3Ctrl = require('./controllers/s3.js');
const sockjs = require('sockjs');
const http = require('http');

const {
  SESSION_SECRET,
  PASSWORD,
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
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

app.get("/sign-s3", (req, res) => {
  aws.config = {
    region: "us-west-1",
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  };
// console.log('hit1');

  const s3 = new aws.S3();
  const fileName = req.query["file-name"];
  const fileType = req.query["file-type"];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 365 * 2,
    ContentType: fileType,
    ACL: "public-read"
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      // console.log('hit2');
      
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData);
  });
});



// AUTH / SESSION \\
app.post("/api/register", auth.register);
app.post("/api/login", auth.login);
app.delete("/api/logout", auth.logout);
app.put("/api/email/:id", auth.emailVerif);
app.get("/api/session", userCtrl.getUserSession)

// USER ENDPOINTS \\
app.put("/api/name/:id", userCtrl.userName);
app.put("/api/profilePic/:id", userCtrl.prof_pic);
app.put("/api/bio/:id", userCtrl.bio);
app.put("/api/cover/:id", userCtrl.coverPic);
app.get("/api/userInfo/:id", userCtrl.getUserInfo)

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

// CHAT ENDPOINTS \\
app.get('/chat/:user_id1/:user_id2', chatCtrl.getChat);
app.post('/chat/:title', chatCtrl.createChat);
app.post('/chat/message/:message_id', chatCtrl.addMessage);
app.post('/userchat', chatCtrl.createUserChat);

// const server = 
massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("TAC-COM ONLINE");
  app.listen(SERVER_PORT, () =>
    console.log(`${SERVER_PORT} BOTTLES OF (undefined) ON THE WALL!!!`)
  );
});

//WEBSOCKET ENDPOINTS\\
const socketServer = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
socketServer.on('connection', function(conn) {
  console.log('connection opened');
  conn.on('data', function(message) {
    console.log('Incoming message', message);
    conn.write(message);
    // conn.close();
  });
  conn.on('close', function() {
    console.log('connection closed');
  });
});
const server = http.createServer(app);
socketServer.installHandlers(server, {prefix: '/sockets/chat'});
server.listen(SERVER_PORT, '0.0.0.0');
