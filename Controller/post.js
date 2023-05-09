const Post = require("../Models/posts")

module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        return res.redirect('back')
    }catch(err){
        console.log(err)
    }


}