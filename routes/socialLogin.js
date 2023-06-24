const router = require('express').Router();
const passport = require("passport")


const { linkedInLoginFailed, linkedInLoginSuccess } = require('../controllers/socialLogin');

router.get('/login/failed', linkedInLoginFailed)

router.get('/login/success', linkedInLoginSuccess)

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/api/v1/login/success',
  failureRedirect: '/api/v1/login/failed'
}));

router.get('/auth/linkedin', passport.authenticate('linkedin'));

module.exports = router