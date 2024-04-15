export const saveLog = (req, res, next) => {
    const timestamp = new Date().toUTCString()
    const logMessage = `${timestamp} - ${req.method} ${req.url}`
    // console.log(logMessage)
    next()
}