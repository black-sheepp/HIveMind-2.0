const router = require('express').Router();

const likeCtrl = require('../Controller/like');


router.post('/toggle',likeCtrl.toggleLike)


module.exports = router;
