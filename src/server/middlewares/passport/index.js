import User from '../../db/models/User';

import LOCAL_STRATEGY_KEY from './localStrategy'; // run and import

const passport = require('passport');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId, (err, user) => done(err, user));
});

export { passport, LOCAL_STRATEGY_KEY };
