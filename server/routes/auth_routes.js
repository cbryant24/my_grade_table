const passport = require('passport');


module.exports = (app) => {
    app.get('/signin/facebook',
    passport.authenticate('facebook'))

    app.get('/signin/facebook/callback',
    passport.authenticate('facebook'), 
    (req, res) => {
        res.redirect('/home')
    })

    app.get('/api/user_info', (req, res) => {
        user = req.user ? req.user:'';
        res.send(user);
        
    })

    app.get('/api/signout', (req, res) => {
        req.logOut();
        res.send('');
        res.redirect('/');
    })
}