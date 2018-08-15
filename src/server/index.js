import './db';
import './middlewares';
import winston from './config/winston';
import AuthRouter from './routes/auth';

const express = require('express');
const os = require('os');
const morgan = require('morgan');
const passport = require('passport');

const app = express();

app.use(morgan('combined', { stream: winston.stream }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', AuthRouter);

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) =>
    res.send({ username: os.userInfo().username })
);

app.listen(8080, () => winston.info('Express server listening on port 8080!'));
