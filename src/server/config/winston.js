import appRoot from 'app-root-path';
import WinstonLogger from 'winston';

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const winston = WinstonLogger.createLogger({
    format: WinstonLogger.format.simple(),
    transports: [
        new WinstonLogger.transports.File(options.file),
        new WinstonLogger.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

winston.stream = {
    write(message) {
        winston.info(message);
    },
};

export default winston;
