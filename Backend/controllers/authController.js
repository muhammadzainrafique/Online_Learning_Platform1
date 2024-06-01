const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const createResponse = require('../utils/createRespones');
const { createAccessToken, createRefreshToken } = require('../utils/tokens');


const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return createResponse(res, false, "All Fields are reqired", 400)

    // checking for duplicate email
    const duplicateEmail = await User.findOne({ email }).lean();
    if (duplicateEmail)
        return createResponse(res, false, "Email Already exist, Login Please", 400)

    // password Hashing
    const hashedPssword = await bcrypt.hash(password, 10);
    console.log({ password: hashedPssword });
    const data = {
        name,
        email,
        password: hashedPssword
    }

    const newUser = await User.create(data);
    if (!newUser)
        return createResponse(res, false, "Invalid Data", 400);

    const userInfo = {
        role: newUser.role,
        subscription: newUser.subscription,
        name:newUser.name,
        id: newUser._id
    }
    const accessToken = createAccessToken(userInfo);
    const refreshToken = createRefreshToken(userInfo);

    res.cookie('jwtToken', refreshToken, {
        httpOnly:true,
        secure:true,
        sameSite:'none',
        maxAge:7*24*60*60*1000
    })

    createResponse(res, true, { accessToken }
    )
})
const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password)
        return createResponse(res, false, "All Fields are reqired", 400)

    const user = await User.findOne({ email }).lean();
    if (!user)
        return createResponse(res, false, "Invalid Credential", 400)

    // checking for password
    const isPsswordMatch = await bcrypt.compare(password, user.password);
    if (!isPsswordMatch)
        return createResponse(res, false, "Invalid Credential", 400)

    const userInfo = {
        role: user.role,
        name:user.name,
        subscription: user.subscription,
        id: user._id
    }
    const accessToken = createAccessToken(userInfo);
    const refreshToken = createRefreshToken(userInfo);
    res.cookie('jwtToken', refreshToken, {
        httpOnly:true,
        secure:true,
        sameSite:'None',
        maxAge:7*24*60*60*1000
    })

    createResponse(res, true, { accessToken })
})

const refresh = asyncHandler(async (req, res) => {



    createResponse(res, true, `getting refresh token`)
})
const logout = asyncHandler(async (req, res) => {



    createResponse(res, true, `Logout Sucessfully`);
})


module.exports = {
    registerUser,
    authUser,
    refresh,
    logout,
}
