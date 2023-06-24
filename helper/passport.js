const passport = require("passport")
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKED_IN_CLIENT_ID,
  clientSecret: process.env.LINKED_IN_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}api/v1/auth/linkedin/callback`,
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
  return done(null,profile);
}));