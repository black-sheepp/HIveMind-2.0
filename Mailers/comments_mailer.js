const nodemailer = require('../Config/node-mailer')

exports.newComment = (comment) => {
    nodemailer.transporter.sendMail({
        from: 'fullstackmerndev@gmail.com',
        to: comment.user.email,
        subject: 'New Commment Posted',
        html: '<h1>Yup, Your comment is now published<h1/>',
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message Sent', info);
        return;
    })
}
