const Comment = require("../Models/comments");
const Post = require("../Models/posts");

module.exports.create = async function (req, res) {
     try {
          let post = await Post.findById(req.body.post);
          if (post) {
               await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id,
               }).then((comment) => {
                    post.comments.push(comment);
                    post.save();
                    // req.flash("success", "Comment Published");
                    res.redirect("/");
               });
          }
     } catch (err) {
          //   req.flash("error", "Cannot Post Empty String");
          return res.redirect("back");
     }
};
