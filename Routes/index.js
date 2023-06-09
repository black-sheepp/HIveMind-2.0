const router = require('express').Router();

const homeCtrl = require('../Controller/home')

router.get('/',homeCtrl.home)
router.get('/sign-in',homeCtrl.signIn)
router.get('/sign-up',homeCtrl.signUp)
router.use('/user',require('./user'))
router.use('/post',require('./post'))
router.use('/comment',require('./comment'))

router.use('/api',require('./Api'))

module.exports = router;