/**@module auth_routes */


const passport = require('passport');

/**
 * @function
 * @param {Object} app 
 * @returns routing provided by passport library, handle user login and logout requests from the client
 * and facebook callback login request
 */
module.exports = (app) => {
    app.get('/signin/facebook',
    passport.authenticate('facebook'))

    app.get('/signin/facebook/callback',
    passport.authenticate('facebook'), 
    (req, res) => {
        res.redirect('/')
    })

    app.get('/api/user_info', (req, res) => {
        user = req.user ? req.user:'';
        res.send(user);
        
    })

    app.get('/api/signout', (req, res) => {
        req.logOut();
        res.send(false);
    })
}