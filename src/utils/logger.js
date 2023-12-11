import winston from 'winston'
import config from '../config/config.js'

const customWinstonLevels = {
    levels: {
        fatal : 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        debug: 'white',
        http: 'green',
        info: 'blue',
        warning: 'yellow',
        error: 'magenta',
        fatal: 'red'
    }
}

winston.addColors(customWinstonLevels.colors)

const createLogger = env => {
    if (env === config.enviroment.enviromentProd) { 
        return winston.createLogger({
            levels: customWinstonLevels.levels,
            transports: [
                new  winston.transports.Console({
                    level: 'debug',
                    format: winston.format.combine(
                    winston.format.json(),
                    winston.format.colorize()
                    )
                }),
                
            ]
        })
    } else {
        return winston.createLogger({
            levels: customWinstonLevels.levels,
            transports: [
                new winston.transports.File({
                    filename: 'errors.log',
                    level: 'info',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                })
            ]
        })
    }
}

const logger = createLogger(process.env.ENVIRONMENT)

export default logger