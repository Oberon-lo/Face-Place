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
app.post('/chatmessage', chatCtrl.addMessage);
app.get('/chatmessages/:current_chat_id', chatCtrl.getMessages);
app.post('/chat/:title', chatCtrl.createChat);
app.post('/userchat', chatCtrl.createUserChat);

// const server = 
massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("TAC-COM ONLINE");
  app.listen(SERVER_PORT, () =>
    console.log(`${SERVER_PORT} BOTTLES OF (undefined) ON THE WALL!!!`)
  );
});

const getMessages_socket = (db, parcel, conn) => {
  chatCtrl.getMessagesSocket(db, parcel.data.current_chat_id)
  .then(messages => {
    // console.log('******** retrieved messages from db', messages);    
    conn.write(JSON.stringify({
      type: 'GET_MESSAGES',
      data: messages
    }));
  })
}

const newMessage_socket = (db, parcel, conn) => {
  chatCtrl.addMessageSocket(db, parcel).then(response => {
    broadcastMessages_socket(db, parcel);
  })
}

const broadcastMessages_socket = (db, parcel) => {
  console.log('broadcast chat id', parcel.data.current_chat_id)
  SOCKET_CONNECTIONS[parcel.data.current_chat_id].forEach(sockConn => {
    getMessages_socket(db, parcel, sockConn);
  })
}

const SOCKET_CONNECTIONS = {};

//WEBSOCKET ENDPOINTS\\
const socketServer = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
socketServer.on('connection', function(conn) {
  console.log('connection opened', conn);
  let sessionId = conn._session.session_id;
  let connId = conn.id;


  // if(!SOCKET_CONNECTIONS.includes(sessionId)){
  //   SOCKET_CONNECTIONS[sessionId] = conn;
  // }
  console.log('********** sessionId', sessionId);
  console.log('********** connId', connId);



  conn.on('data', function(parcel) {
    parcel = JSON.parse(parcel);
    let db = app.get("db");
    let chat_id = parcel.data.current_chat_id; //parcel must ALWAYS contain the current chat id

    if(!SOCKET_CONNECTIONS[chat_id]){
      SOCKET_CONNECTIONS[chat_id] = [conn];
    }
    else {
      SOCKET_CONNECTIONS[chat_id].push(conn);
    }

    console.log('****** SOCKET_CONNECTIONS', SOCKET_CONNECTIONS);

    if(parcel.type === 'GET_MESSAGES'){
      broadcastMessages_socket(db, parcel);
    }
    else if(parcel.type === 'NEW_MESSAGE'){
      newMessage_socket(db, parcel, conn);
    }


  });
  conn.on('close', function() {
    console.log('connection closed');
  });
});
const server = http.createServer(app);
socketServer.installHandlers(server, {prefix: '/sockets/chat'});
server.listen(SERVER_PORT, '0.0.0.0');
