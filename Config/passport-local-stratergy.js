const passport = require("passport");
//Import the secondary "Strategy" library
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Models/users");

passport.use(
     new LocalStrategy(
          {
               usernameField: "email",
               passReqToCallback: true,
          },
          function (req, email, password, done) {
               User.findOne({ email: email })
                    .then((user) => {
                         if (!user) {
                              req.flash("error", "Invalid Username/Password");
                              console.log("Invalid Username/Password");
                              return done(null, false);
                         }
                         if (user.password != password) {
                              req.flash("error", "Invalid Username/Password");
                              console.log("Invalid Username/Password");
                              return done(null, false);
                         }
                         return done(null, user);
                    })
                    .catch((err) => {
                         req.flash("error", err);
                         return done(err);
                    });
          }
     )
);

passport.serializeUser((user, done) => {
     done(null, user.id);
});

passport.deserializeUser((id, done) => {
     User.findById(id)
          .then((user) => done(null, user))
          .catch((err) => done(err));
});

passport.checkAuthentication = function (req, res, next) {
     if (req.isAuthenticated()) {
          return next();
     }
     return res.redirect("/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
     if (req.isAuthenticated()) {
          res.locals.user = req.user;
     }
     next();
};

module.exports = passport;
