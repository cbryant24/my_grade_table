const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

const models = require('../models');
const User = models.users

const fb_access = require('../config/fb_keys')


passport.serializeUser( (user, done) => {
  done(null, user.id);
});

passport.deserializeUser( (id, done) => {
  User.findById(id).then( (users) => {
    done(null, users)
  })
});

passport.use(
  new FacebookStrategy({
    clientID: fb_access.APP_ID,
    clientSecret: fb_access.APP_SECRET,
    callbackURL: "/signin/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.
    findOrCreate({ where: {
      fb_id: profile.id,
      email: '',
      name: profile.displayName
    }}).spread( (user, created) => {
      if(created === false) {
      }
      done(null, user)
    })
    
  }
));