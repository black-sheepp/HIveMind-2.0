const Comment = require("../Models/comments");
const Post = require("../Models/posts");
const commentMailer = require('../Mailers/comments_mailer')

module.exports.create = async function (req, res) {
     try {
          let post = await Post.findById(req.body.post);
          if (post) {
               let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id,
               });
               post.comments.push(comment);
               post.save();
               comment = await comment.populate('user','firstName email')
               commentMailer.newComment(comment);
               res.redirect("/");
          }
     } catch (err) {
          req.flash("error", "Cannot Post Empty String");
          return res.redirect("back");
     } 
};

module.exports.destroy = async function (req, res) {
     try {
          let comment = await Comment.findById(req.params.id);
          if (comment) {
               let postId = comment.post;
               comment.deleteOne();
               await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
               req.flash("error", "Comment Deleted");
               return res.redirect("back");
          } else {
               console.log("Comment not found");
          }
     } catch (err) {
          console.log(err);
     }
};
