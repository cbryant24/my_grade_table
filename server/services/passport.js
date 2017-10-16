const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

const fb_access = require('../config/fb_keys')


passport.serializeUser( (user, done) => {
  // done(null, user.id);
});

passport.deserializeUser( (id, done) => {
  // done(null, id)
});

debugger
passport.use(
  new FacebookStrategy({
    clientID: fb_access.APP_ID,
    clientSecret: fb_access.APP_SECRET,
    callbackURL: "/signin/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('this is the profile from fb route', profile)
  }
));