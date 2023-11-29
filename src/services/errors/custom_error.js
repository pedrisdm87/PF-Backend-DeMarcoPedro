export default class CustomError {
    static createError({ name = "Error", cause, message, code }) {
        const error = new Error(message, { cause })
        console.log(cause)
        error.name = name
        error.code = code
        return error
    }
}