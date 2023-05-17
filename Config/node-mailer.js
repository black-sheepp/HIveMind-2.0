const ejs = require("ejs");
const nodemailer = require("nodemailer");
const path = require("path");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
     service: "gmail",
     host: "smtp.gmail.com",
     port: 587,
     secure: false, // true for 465, false for other ports
     auth: {
          user: "fullstackmerndevelop@gmail.com", // generated ethereal user
          pass: "mexpwmlwnkoarulq", // generated ethereal password
     },
});

let renderTemplate = (data, relativePath) => {
     let mailHTML;
     ejs.renderFile(path.join(__dirname, "../views/mailers", relativePath), data, function (err, template) {
          if (err) {
               console.log("Error in rendering template");
               return;
          }
          mailHTML = template;
     });
     return mailHTML;
};

module.exports = {
     transporter: transporter,
     renderTemplate: renderTemplate,
};
