import winston from '../../config/winston';
import User from '../../db/models/User';

import { passport, LOCAL_STRATEGY_KEY } from '../../middlewares/passport';

const express = require('express');

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
        if (!username) {
            return res.status(400).json({
                msg: 'No username provided',
                usernameError: true,
            });
        }
        if (!password) {
            return res.status(400).json({
                msg: 'No password provided',
                passwordError: true,
            });
        }
        return next();
    },
    (req, res, next) =>
        passport.authenticate(LOCAL_STRATEGY_KEY, (authErr, user) => {
            if (authErr) {
                return next(authErr);
            }
            if (!user) {
                return res.status(401).json({
                    msg: 'Login failed. Please check your credentials',
                });
            }
            req.login(user, loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }
                return res.status(200).json(req.user);
            });
        })(req, res, next)
);
AuthRouter.post('/register', (req, res, next) => {
    const { username, password, passwordConf } = req.body;
    winston.info(`Register request with username: ${username}`);
    if (!username || !password || !passwordConf) {
        res.status(400).json({
            msg: 'The fields are not filled in',
            usernameError: true,
            passwordError: true,
        });
        return;
    }
    if (password !== passwordConf) {
        res.status(400).json({
            msg: 'The passwords are not the same',
            passwordError: true,
        });
        return;
    }

    User.create({ username, password })
        .then(user => {
            req.login(user, err => {
                if (err) next(err);
                else res.json(user);
            });
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.status(409).json({
                    msg: 'Username already taken',
                    usernameError: true,
                });
            } else next(err);
        });
});

AuthRouter.post('/logout', (req, res) => {
    req.logout();
    res.status(204).end();
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
