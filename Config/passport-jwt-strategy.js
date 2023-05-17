const passport = require("passport");
const User = require("../Models/users");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "hivemind";

passport.use(
     new JWTStrategy(opts, async function (jwt_payload, done) {
          let user = await User.findOne({ id: jwt_payload.sub });
          if (user) {
               return done(null, user);
          } else {
               return done(null, false);
               // or you could create a new account
          }
     })
);

module.exports = passport;
