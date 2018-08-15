import User from '../../db/models/User';

import LOCAL_STRATEGY_KEY from '../../middlewares/passport';

const express = require('express');
const passport = require('passport');

const AuthRouter = express.Router();

export const loggedInOnly = (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.redirect('/login');
};

export const loggedOutOnly = (req, res, next) => {
    if (req.isUnauthenticated()) next();
    else res.redirect('/');
};

AuthRouter.post(
    '/login',
    (req, res, next) => {
        const { username, password } = req.body;
        if (!username) res.status(400).json({ msg: 'No username provided' });
        if (!password) res.status(400).json({ msg: 'No password provided' });
        next();
    },
    passport.authenticate(LOCAL_STRATEGY_KEY),
    (req, res) => {
        if (req.isAuthenticated) {
            res.redirect('/');
        } else {
            res.status(401).end({ msg: 'Authentication failed' });
        }
    }
);
AuthRouter.post('/register', (req, res, next) => {
    const { username, password } = req.body;
    User.create({ username, password })
        .then(user => {
            req.login(user, err => {
                if (err) next(err);
                else res.redirect('/');
            });
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.status(409).json('Username already taken');
            } else next(err);
        });
});

AuthRouter.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

AuthRouter.get('/', (req, res) => {
    if (req.isAuthenticated && req.user) {
        console.log('User is authenticated', req.user);
        res.json(req.user);
    } else {
        console.log('No user in session');
        res.status(401).json({ msg: 'No user logged in' });
    }
});

export default AuthRouter;
