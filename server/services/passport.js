/**@module passport_service */

/**
 * @requires paspport
 * passport handles user authentication services in this instance
 * passport is used to handle authorization for Facebook login for the app
 */
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

/**
 * establish connection to the database and table that 
 * passport will use to create and verify user info
 */
const models = require('../models');
const User = models.users

const fb_access = require('../config/fb_keys')

/**
 * after the user has logged in passport will create a session and stored the 
 * serialized authenticated user in the clients cookies and subsequent requests
 * will be verfied using the session cookies to serialize and deserialize the user
 */
passport.serializeUser( (user, done) => {
  done(null, user.id);
});

passport.deserializeUser( (id, done) => {
  User.findById(id).then( (users) => {
    done(null, users)
  })
});

/**
 * use of the passport user authentication service using the Facebook strategy
 * to verify and create a user
 */
passport.use(
  new FacebookStrategy({
    clientID: fb_access.APP_ID,
    clientSecret: fb_access.APP_SECRET,
    callbackURL: "/signin/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    /**
     * after facebook has verified the user find the user in the database
     * or create a new user in the database on the user table
     */
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