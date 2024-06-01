const jwt = require('jsonwebtoken');
const createAccessToken = (userInfo) => {
    const token = jwt.sign(
        {
            userInfo
        },
        process.env.ACCESS_TOKEN_KEY,
         {
        expiresIn:'15m'
        }
    )
    return token;
}
const createRefreshToken = (userInfo) => {
    const token = jwt.sign(
        {
            userInfo
        },
        process.env.ACCESS_TOKEN_KEY,
         {
        expiresIn:'15m'
        }
    )
    return token;
}

module.exports = {
    createAccessToken,
    createRefreshToken,
}