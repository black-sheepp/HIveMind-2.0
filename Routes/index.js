const router = require('express').Router();

const homeCtrl = require('../Controller/home')

router.get('/',homeCtrl.home)
router.get('/sign-in',homeCtrl.signIn)
router.get('/sign-up',homeCtrl.signUp)

module.exports = router;