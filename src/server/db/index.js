import mongoose from 'mongoose';
import winston from '../config/winston';

const ENV = process.env.NODE_ENV || 'dev';
const MONGO_URL = process.env.MONGO_URL || `mongodb://localhost:27017/${ENV}`;

winston.info(`Mongoose Connecting to ${MONGO_URL}`);

mongoose
    .connect(
        MONGO_URL,
        { useNewUrlParser: true }
    )
    .then(() => winston.info('Mongo connected'))
    .catch(err => winston.error('Mongo connection error', err));

const dbConnection = mongoose.connection;

export default dbConnection;
