const router = require('express').Router();

router.use('/posts',require('./post'))
router.use('/users',require('./user'))

module.exports = router;