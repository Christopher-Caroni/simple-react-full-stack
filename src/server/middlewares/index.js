import winston from '../config/winston';
import dbConnection from '../db';
import { passport } from './passport';

const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

export const sessionMiddleware = session({
    store: new MongoStore({ mongooseConnection: dbConnection }),
    secret: 'appy-secret',
    resave: false,
    saveUninitialized: true,
});

export const passportInitMiddleware = passport.initialize();
export const passportSessionMiddleware = passport.session();

export default function applyAppMiddlewares(app) {
    app.use(morgan('combined', { stream: winston.stream }));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(sessionMiddleware);

    app.use(passportInitMiddleware);
    app.use(passportSessionMiddleware);
}
