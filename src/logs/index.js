"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: 'all',
            level: `debug`,
        })
    ]
});
class Logger {
    static log(message) {
        // tslint:disable
        console.log(message);
        // tslint:enable
    }
    static info(message) {
        logger.log('info', message);
    }
    static debug(message) {
        logger.log('debug', message);
    }
    static error(message) {
        logger.log('error', message);
    }
}
exports.default = Logger;
//# sourceMappingURL=index.js.map