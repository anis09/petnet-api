import winston from 'winston';

const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    )
});

logger.add(
    new winston.transports.Console({
        format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
    }),
);

const stream = {
    write: (message: string) => {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
};

export { logger, stream };