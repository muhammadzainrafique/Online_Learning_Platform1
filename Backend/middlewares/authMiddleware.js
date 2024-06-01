const jwt = require('jsonwebtoken');
const createResponse = require('../utils/createRespones');
// verifying json web token
const  authCheck = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')) 
        return createResponse(res, false, 'Unauthorized', 400)
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_KEY,
        (err, decode) => {
            if(err) return createResponse(res, false, "Forbidden ho gya token", 400);
            req.userInfo = decode.userInfo;
            next();
        }
    )
} 
// check whether user have Subscription
const  authSubscriber = (req, res, next) => {
    console.log(req.userInfo)
    const { subscription } = req.userInfo;
    if(subscription === 'unenrolled') 
        return createResponse(res, false, "Subscribe Please", 400);

    next();
} 

// checking for admin
const  adminAuth = (req, res, next) => {
    const { role } = req.userInfo;
    if(role !== 'admin')
        return createResponse(res, false, "Unauthorized ha tue admin nahi ha tu", 400);
    next();
} 
const  authInsturctor = (req, res, next) => {
    const { role } = req.userInfo;
    if(role !== 'instructor')
        return createResponse(res, false, "Unauthorized", 400);
    next();
} 



module.exports = {
    authCheck,
    authSubscriber,
    adminAuth,
    authInsturctor
}