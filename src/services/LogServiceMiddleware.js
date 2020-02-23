import winston from 'winston';

const logConfiguration = {
    "format": winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    'transports': [
        new winston.transports.File({
            filename: './logs/task1.log',
            level: 'info'
        }),
        new winston.transports.File({
            filename: './logs/errors.log',
            level: 'error'
        })
    ]
};

const logger = winston.createLogger(logConfiguration);

export const logService = (req, res, next) => {
    
    const { method, params, query, body } = req;
    const args = { method, params, query, body }
    
    logger.info(`Service method ${method} has been invoked with arguments: ${Object.keys(args).forEach(key => `${key}: ${args.key}`)}`);
    next();
};

export const logError = (err, req, res, next) => {

    console.log('Logger', err);
    logger.error(err);
    res.status(500).send({ error: 'Something failed!' });
    next();
}