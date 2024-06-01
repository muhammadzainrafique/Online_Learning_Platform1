
const createResponse = (res, Success, Message, statusCode = 200 ) =>{
    res.status(statusCode).json({
        Success,
        Message,
    })
}

module.exports = createResponse;

