const Comment = require("../../../Models/comments");
const Post = require("../../../Models/posts")

module.exports.index = async function(req,res){
    return res.status(200).json({
        message: "List of Posts",
        posts: await Post.find({}).populate()
    })
}

module.exports.destroy = async function (req, res) {
    try {
         let post = await Post.findById(req.params.id);
         if (post) {
                   post.deleteOne();
                   await Comment.deleteMany({ post: req.params.id });

                return res.status(200).json( {"message" : "Post and associated comments deleted successfully."})
         }
    } catch (err) {
        console.log("***********", err)

        return res.status(500).json({message: "Internal Server Error"})
    } 
};
