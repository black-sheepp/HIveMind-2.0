const Comment = require("../Models/comments");
const Like = require("../Models/like");
const Post = require("../Models/posts");

module.exports.toggleLike = async function(req,res){
    try{

        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes')
        }

        // check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id,
        })

        // if a like already exist then deleted it 
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();

            deleted = true;
        }else{
            // else make a new like
            let newLike = await Like.create({
                user: req.user.id,
                likeable: req.query.id,
                onModel: req.query.type,
            })

            likeable.likes.push(newLike._id);
            likeable.save();

        }

        return res.status(200).json({
            message: "Request Successful!",
            data: {
                deleted: deleted,
            }
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"})
    }
}