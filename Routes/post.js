const router = require('express').Router();
 
const postCtrl = require('../Controller/post')

router.post('/create',postCtrl.create)

module.exports = router