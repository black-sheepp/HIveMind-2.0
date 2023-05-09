const router = require('express').Router();

const passport = require('passport');
const commentCtrl = require('../Controller/comment')

router.post('/create',passport.checkAuthentication,commentCtrl.create)

module.exports = router