import winston from 'winston'
import config from '../src/config/config.js'

const customWinstonLevels = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
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
                    format: winston.format.json()
                })  
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