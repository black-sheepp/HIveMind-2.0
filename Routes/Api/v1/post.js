const router = require('express').Router();
const passport = require('passport')

const postApi = require('../../../Controller/Api/v1/postApi')

router.get('/',postApi.index)
router.delete("/:id",passport.authenticate('jwt',{session: false}),postApi.destroy)

module.exports = router;