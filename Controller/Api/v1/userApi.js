const User = require("../../../Models/users");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
     try {
          let user = await User.findOne({email: req.body.email});
          if(!user || user.password != req.body.password){
            return res.status(422).json({ message: "Invalid Username / Password" });
        }

        return res.status(200).json({ message: "Sign In Successful. Here is your token, please keep it safe!", data: {
            token: jwt.sign(user.toJSON(), 'hivemind', {expiresIn: '10000'})
        } });

     } catch (err) {
          console.log("***********", err);
          return res.status(500).json({ message: "Internal Server Error" });
     }
};
