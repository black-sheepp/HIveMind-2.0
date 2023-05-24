const Comment = require("../Models/comments");
const Post = require("../Models/posts");

module.exports.create = async function (req, res) {
     try {
          let post = await Post.create({
               content: req.body.content,
               user: req.user._id,
          });

          if(req.xhr){
               post = await post.populate('user');
               return res.status(200).json({
                    data: {
                         post: post,
                    },
                    message: "Post Created !!"
               })
          }
          req.flash("success","Your Query Posted Succefully")
          return res.redirect("back");
     } catch (err) {
          console.log(err);
     }
};

module.exports.destroy = async function (req, res) {
     try {
          let post = await Post.findById(req.params.id);
          if (post) {
               if (post.user == req.user.id) {
                    post.deleteOne();
                    await Comment.deleteMany({ post: req.params.id });

                    if(req.xhr){
                         return res.status(200).json({
                              data: {
                                   post_id: req.params.id,
                              },
                              message: 'Post Deleted'
                         })
                    }

                    req.flash("error","Posted Deleted Succefully")
                    return res.redirect("back");
               }
          } else {
               return res.redirect("back");
          }
     } catch (err) {
          console.log(err);
     } 
};
