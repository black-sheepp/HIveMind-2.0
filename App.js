const express = require("express");
const App = express();
const Port = 8080;
const expressLayouts = require("express-ejs-layouts");
const db = require("./Config/mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const passportLocal = require("./Config/passport-local-stratergy");

App.set("view engine", "ejs");
App.use(express.static("./Assets"));
App.use(expressLayouts);
App.use(bodyParser.urlencoded({ extended: false }));
App.use(
     session({
          name: "HiveMind",
          secret: "secret",
          resave: false,
          saveUninitialized: true,
          cookie:{
            maxAge: 1000*60*100*10
          }
     })
);
// This is the basic express session({..}) initialization.
App.use(passport.initialize());
// init passport on every route call.
App.use(passport.session());
App.use(passport.setAuthenticatedUser)

// Express routes
App.use("/", require("./Routes"));

App.listen(Port, () => {
     console.log("Server is Up and running on port", Port);
});
