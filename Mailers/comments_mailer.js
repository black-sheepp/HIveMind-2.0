const nodemailer = require('../Config/node-mailer')

exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment},'/new_comments.ejs')

    nodemailer.transporter.sendMail({
        from: 'fullstackmerndev@gmail.com',
        to: comment.user.email,
        subject: 'New Commment Posted',
        html: htmlString,
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message Sent', info);
        return;
    })
}
