const express = require("express");
const path = require('path')
const App = express();
const Port = 8080;
const expressLayouts = require("express-ejs-layouts");
const db = require("./Config/mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const passportLocal = require("./Config/passport-local-stratergy");
const passportJWT = require('./Config/passport-jwt-strategy');
const passportGoogle = require('./Config/passport-google-oauth2-strategy')
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMiddleware = require("./Config/middleware");

// Setup the chat server to be used with socket.io
const chatServer = require('http').createServer(App); // Fix: Use createServer instead of Server
const chatSocket = require('./Config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5001);
console.log('Chat server is listening on port 5001');



App.set("view engine", "ejs");
App.set('views', path.join(__dirname) + '/Views');
App.use(express.static("./Assets"));
App.use("/Upload", express.static(__dirname + "/Upload"));
App.use(expressLayouts);
App.use(bodyParser.urlencoded({ extended: false }));
App.use(
     session({
          name: "HiveMind",
          secret: "secret",
          resave: false,
          saveUninitialized: true,
          cookie: {
               maxAge: 1000 * 60 * 100 * 10,
          },
          store: mongoStore.create({
               mongoUrl: "mongodb://127.0.0.1:27017/HiveMind_Dev",
               autoRemove: "disabled", // Default
          }),
     })
);
// This is the basic express session({..}) initialization.
App.use(passport.initialize()); 
// init passport on every route call.
App.use(passport.session());
App.use(passport.setAuthenticatedUser);
App.use(flash());
App.use(customMiddleware.setflash)

// Express routes
App.use("/", require("./Routes"));

App.listen(Port, () => {
     console.log("Server is Up and running on port", Port);
});
