const router = require('express').Router();

const homeCtrl = require('../Controller/home')

router.get('/',homeCtrl.home)

module.exports = router;