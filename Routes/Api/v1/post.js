const router = require('express').Router();

const postApi = require('../../../Controller/Api/v1/postApi')

router.get('/',postApi.index)
router.delete("/:id",postApi.destroy)

module.exports = router;