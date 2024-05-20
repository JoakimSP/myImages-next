import winston from 'winston';

const infoLogger = winston.createLogger({
        transports: [
            new winston.transports.File({
                filename: 'info.log',
                level: 'info',
                format: winston.format.json(),
            })
        ]
    });


export default infoLogger;
