const express = require('express');
const getRoute = require('./routes/index');
const path = require('path');

const cookie_session = require('cookie-session');
const passport = require('passport');
const body_parser = require('body-parser');
const cookie_key = require('./config/fb_keys').cookie_key

const app = express();

require('./services/passport');

app.use('/', express.static(path.resolve(__dirname, '..', 'my-app', 'build')));

app.use('/', getRoute);

app.use(body_parser.json());
app.use(
    cookie_session({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [cookie_key]
    })
)

app.use(passport.initialize());
app.use(passport.session())
require('./routes/auth_routes')(app)

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'my-app', 'build', 'index.html'));
})

app.listen(4001, () => console.log('listening on port 4001'));