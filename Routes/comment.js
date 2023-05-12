const router = require('express').Router();

const passport = require('passport');
const commentCtrl = require('../Controller/comment')

router.post('/create',passport.checkAuthentication,commentCtrl.create)
router.get('/destroy/:id',passport.checkAuthentication,commentCtrl.destroy)

module.exports = router