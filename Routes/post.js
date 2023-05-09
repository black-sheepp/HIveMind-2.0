const router = require('express').Router();
 
const passport = require('passport');
const postCtrl = require('../Controller/post')

router.post('/create',passport.checkAuthentication,postCtrl.create)

module.exports = router