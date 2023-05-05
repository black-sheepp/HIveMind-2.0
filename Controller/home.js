module.exports.home = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/dashboard')
    }
    return res.render("home",{
        title: "Home"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
    return res.render("_signIn",{
        title: "Sign In"
    })
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
    return res.render("signUp",{
        title: "Sign Up"
    })
}