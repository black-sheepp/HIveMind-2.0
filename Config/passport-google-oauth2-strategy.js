const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../Models/users");

passport.use(
     new googleStrategy(
          {
               clientID: "377991864259-0e08sscvl5th0qqt6v4o3cudefmnbhpn.apps.googleusercontent.com",
               clientSecret: "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",
               callbackURL: "http://localhost:8080/user/auth/google/callback",
          },
          async function (accessToken, refreshToken, profile, done) {
               let user = await User.findOne({ email: profile.emails[0].value});
               console.log(profile);
               if (user) {
                    return done(null, user);
               } else {
                    {
                         console.log("User Account doesnot exist. Please Sign Up");
                         return;
                    }
               }
          }
     )
);

module.exports = passport;
