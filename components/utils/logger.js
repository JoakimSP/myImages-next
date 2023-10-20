const winston = require('winston');

const customFormat = winston.format.printf(({ timestamp, level, message, ...metadata }) => {
    if (typeof message !== 'string') {
        return `${timestamp} [${level}] - ${JSON.stringify(metadata)}`;
    }
    // Split the stack trace to extract filename and line number
    const stackLines = message.split('\n');
    const errorLine = stackLines[1] || '';  // Typically, the first line is the error message, and the second line has the file/line info.
    const filePath = errorLine.split('(')[1]?.split(':')[0];
    const lineNumber = errorLine.split(':')[1];

    return `${timestamp} [${level}] File: ${filePath} Line: ${lineNumber} - ${stackLines[0]} ${JSON.stringify(metadata)}`;
});


const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), customFormat),
        })
    ],
});

module.exports = logger