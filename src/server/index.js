import './db';
import winston from './config/winston';
import AuthRouter from './routes/auth';
import applyAppMiddlewares from './middlewares';

const express = require('express');
const os = require('os');

const app = express();

applyAppMiddlewares(app);

app.use('/api/auth', AuthRouter);

app.use('/web', express.static('dist'));

app.get('/api/getUsername', (req, res) =>
    res.send({ username: os.userInfo().username })
);

app.listen(8080, () => winston.info('Express server listening on port 8080!'));
