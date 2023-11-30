import logger from "../../logger"
export default class CustomError {
    static createError({ name = "Error", cause, message, code }) {
        const error = new Error(message, { cause })
        logger.info(cause)
        error.name = name
        error.code = code
        return error
    }
}