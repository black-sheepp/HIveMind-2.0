const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
     {
          firstName: {
               type: String,
               required: true,
          },
          lastName: {
               type: String,
               required: true,
          },
          email: {
               type: String,
               required: true,
               unique: true,
          },
          password: {
               type: String,
               required: true,
          },
          github: {
               type: String,
               required: true,
          },
          linkedIn: {
               type: String,
               required: true,
          },
          company: {
               type: String,
               required: true,
          },
          profile: {
               type: String,
               required: true,
          },
          skills: {
               type: String,
               required: true,
          },
          phone: {
               type: Number,
               required: true,
          },
     },
     {
          timestamps: true,
     }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
