const router = require('express').Router();

router.use('/posts',require('./post'))

module.exports = router;