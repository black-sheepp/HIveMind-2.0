const router = require('express').Router();

const userApi = require('../../../Controller/Api/v1/userApi')

router.post('/create-session', userApi.createSession)

module.exports = router;