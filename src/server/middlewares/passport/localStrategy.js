import User from '../../db/models/User';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/**
 * @const {String}
 * @description
 * The name of the local strategy used by this app
 */
const LOCAL_STRATEGY_KEY = 'local';

const local = new LocalStrategy((username, password, done) => {
    User.findOne({ username })
        .then(user => {
            if (!user || !user.validPassword(password)) {
                done(null, false, { message: 'Invalid username/password' });
            } else {
                done(null, user);
            }
        })
        .catch(e => done(e));
});

passport.use(LOCAL_STRATEGY_KEY, local);

export default LOCAL_STRATEGY_KEY;
