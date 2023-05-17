const router = require("express").Router();
const passport = require("passport");
const userCtrl = require("../Controller/user");

router.post("/create-user", userCtrl.create);

router.post(
     "/create-session",
     passport.authenticate("local", {
          failureRedirect: "/sign-in",
     }),
     userCtrl.createSession
);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/sign-in'}),userCtrl.createSession)

router.get("/dashboard",passport.checkAuthentication ,userCtrl.dashboard);
router.get("/profile/:id",passport.checkAuthentication,userCtrl.profile)
router.get("/update-profile/:id",passport.checkAuthentication,userCtrl.updateProfile)
router.post("/update-success/:id",passport.checkAuthentication,userCtrl.updateSuccess)
router.get("/sign-out",userCtrl.signOut)

module.exports = router;
