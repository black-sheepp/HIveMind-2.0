const queue = require("../Config/kue");
const commentsMailer = require("../Mailers/comments_mailer");

queue.process('emails',function(job,done){
    console.log('Emails worker is processing a job.', job.data);

    commentsMailer.newComment(job.data);

    done();
})