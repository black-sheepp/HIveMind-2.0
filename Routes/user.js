const router = require('express').Router();

const passport = require('passport');
const userCtrl = require('../Controller/user')

router.post('/create-user',userCtrl.create)

router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect: "/sign-in",    }
),userCtrl.createSession)
router.get('/dashboard',userCtrl.dashboard)

module.exports = router;