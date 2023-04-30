const router = require('express').Router();

const userCtrl = require('../Controller/user')

router.post('/create-user',userCtrl.create)

module.exports = router;