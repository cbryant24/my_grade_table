const passport = require('passport');


module.exports = (app) => {
    debugger
    app.get('/signin/facebook',
    passport.authenticate('facebook'))

    app.get('/signin/facebook/callback',
    passport.authenticate('facebook'), 
    (req, res) => {
        console.log('this the request from the callback', req)
        res.send('You are now logged in')
    })
}