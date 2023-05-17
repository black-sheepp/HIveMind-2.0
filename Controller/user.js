const Post = require("../Models/posts");
const User = require("../Models/users");

module.exports.create = async function (req, res) {
     try {
          if (req.body.password != req.body.confirm_password) {
               req.flash("success","password not matched")
               console.log("password not matched");
               return res.redirect("back");
          }

          let user = await User.findOne({ email: req.body.email });

          if (!user) {
               User.create(req.body);
               req.flash("success","New User Created")
               return res.redirect("/sign-in");
          }

          if (user) {
               return res.redirect("/sign-in");
          } else {
               return res.redirect("back");
          }
     } catch (err) {
          console.log(err);
     }
};

module.exports.createSession = function (req, res) {
     req.flash('success','You have Logged In Successfully')
     return res.redirect("/user/dashboard");
};

module.exports.dashboard = async function (req, res) {
     try {
          return res.render("dashboard", {
               title: "Dashboard",
               posts: await Post.find({})
                    .sort({ createdAt: -1 })
                    .populate("user")
                    .populate({
                         path: "comments",
                         populate: {
                              path: "user",
                         },
                    }),
               friendList: await User.find({}).sort({firstName: 1}),
          });
     } catch (err) {
          console.log(err);
     }
};

module.exports.profile = async function (req, res) {
     return res.render("profile", {
          title: "Profile",
          profile_user: await User.findById(req.params.id),
     });
};

module.exports.updateProfile = async function (req, res) {
     return res.render("updateProfile", {
          title: "Update Profile",
          user: await User.findById(req.params.id),
     });
};

module.exports.updateSuccess = async function (req, res) {
     if (req.user.id == req.params.id) {
          try {
               let user = await User.findById(req.params.id);
               if (user) {
                    await User.uploadedAvatar(req, res, function (err) {
                         console.log(req.file);
                         user.firstName = req.body.firstName;
                         user.lastName = req.body.lastName;
                         user.email = req.body.email;
                         user.phone = req.body.phone;
                         user.address = req.body.address;
                         user.password = req.body.password;
                         user.jobProfile = req.body.jobProfile;
                         user.companyName = req.body.companyName;
                         user.skills = req.body.skills;
                         user.linkedIn = req.body.linkedIn;
                         user.github = req.body.github;
                         console.log(user);
                         if (req.file) {   
                              // this is saving the path of the uploaded file into the avatar field as a string in the user schema
                              user.avatar = User.avatarPath + "/" + req.file.filename;
                         }
                         user.save();
                         req.flash("success","Users Profile Updated")
                         return res.redirect("back");
                    });
               }
          } catch (err) {
               console.log(err);
          }
     } else {
          req.flash("error","Update Profile failed")
          console.log("Update Profile failed");
          return res.status(401).send("Update Profile failed");
     }
};

module.exports.signOut = function (req, res) {
     req.logout(function (err) {
          if (err) {
               return next(err);
          }
          req.flash('success','You have Logged Out Successfully')
          res.redirect("/");
     });
};
