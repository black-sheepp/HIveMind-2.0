const express = require("express");
const App = express();
const Port = 8080;
const expressLayouts = require("express-ejs-layouts");
const db = require("./Config/mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const passportLocal = require("./Config/passport-local-stratergy");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMiddleware = require("./Config/middleware");

App.set("view engine", "ejs");
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
