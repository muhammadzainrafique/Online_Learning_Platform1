const asyncHandler = require('express-async-handler');
const User = require('../models/user'); 
const createResponse = require('../utils/createRespones');
const bcrypt = require('bcrypt');
const { getHashedPassword } = require('../utils/helperFunction');

// getAllUsers
const allUsers = asyncHandler ( async (req, res) => {
    const allUsers = await User.find().select("-password").lean();

    createResponse(res, true, allUsers);
})

const getUser = asyncHandler ( async (req, res) => {
    const { id } = req.params;
    if(!id) return createResponse(res, false, "Id is required", 400);

    const user = await User.findById(id).select("-password").lean();
    if(!user) return createResponse(res, false, "User not found", 400);

    createResponse(res, true, user);
})
const changePassword = asyncHandler( async (req, res ) => {
    const { id } = req.params;
    const { oldPassword, password:newPassword } = req.body;
    console.log(id, newPassword, oldPassword);

    if(!id || !newPassword || !oldPassword)
        return createResponse(res, false, "id and password is required", 400);

    const user = await User.findById(id);
    if(!user) return createResponse(res, false, "User not found", 400);
    const isOldPasswordIsMatched = await bcrypt.compare(oldPassword, user.password);
    if(!isOldPasswordIsMatched)
        return createResponse(res, false, "Old password is not correct", 400);


    const hashedPssword = await getHashedPassword(newPassword);
    user.password = hashedPssword;

    await user.save();
    createResponse(res, true, "Password Updated");
})
const addToPlaylist = asyncHandler( async (req, res ) => {
    const { id } = req.params;
    const { courseId } = req.body;

    if(!id || !courseId)
        return createResponse(res, false, "id and Course id is required", 400);

    const user = await User.findById(id);
    if(!user) return createResponse(res, false, "User not found", 400);

    // checking for courseId whether it is already exist or not
    if(user.playlist?.length){
        const isCourseExist = user.playlist?.filter(
            course => course.courseId.toString() === courseId
            )
        if(isCourseExist?.length) {
            return createResponse(res, false, "Course is already in playlist", 400)
        }
    }

    const playlist = [...user?.playlist, {courseId, poster:"dev C++ poster"}];
    user.playlist = playlist;
    await user.save();
    createResponse(res, true, "course added to playlist");
})
const removeFromPlaylist = asyncHandler (async (req, res) => {
    const {id} = req.params;
    const { courseId } = req.body; 

    if(!id || !courseId)
        return createResponse(res, false, "id and Course id is required", 400);

    const user = await User.findById(id);
    if(!user) return createResponse(res, false, "User not found", 400);

    if(!user.playlist?.length)
        return createResponse(res, false, "No Such course found", 400);

    const updatedPlaylist = user.playlist.filter(course => course.courseId.toString() !== courseId);
    console.log(updatedPlaylist);

    user.playlist = updatedPlaylist;
    await user.save();
    createResponse(res, true, "Removed from playlist");
})
const changeProfilePhoto = asyncHandler( async (req, res ) => {
    // const { id } = req.params;

    // if(!id || !newPassword)
    //     return createResponse(res, false, "id and password is required", 400);

    // const user = await User.findById(id);
    // if(!user) return createResponse(res, false, "User not found", 400);


    // await user.save();
    createResponse(res, true, "Profile photo is updated");
})
const updateProfile = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    if(!id || !name || !email )
        return createResponse(res, false, "All fields are required", 400) 

    const user = await User.findById(id);
    if(!user) return createResponse(res, false, "No user Found", 400 )
    
    // checking for duplicate email
    const duplicateUser = await User.findOne({email});
    if(duplicateUser?._id?.toString()!=id)
        return createResponse(res, false, "Email Already Exist", 400);

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    createResponse(res, true, "User updated");
})

const updateUserRole = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    if(!id) return createResponse(res, false, "Id is required", 400);
    if(!role) return createResponse(res, false, "role is required", 400);

    const user = await User.findById(id).select("-password");
    if(!user) return createResponse(res, false, "User not found", 400);

    user.role = role;

    await user.save();

    createResponse(res, true, "Role is updated");

})
const forgetPassowrd = asyncHandler (async (req, res) => {
    const { email } = req.body;
    // we sent token to user record in database;

    // also sent a link to reset password to its email
    createResponse(res, true, "Link is sent to your email Address")
})
const resetPassword = asyncHandler (async (req, res) => {
    // we will get token from the database
    // if it is valid than we will reset it
    createResponse(res, true, "Password is reset")
})
module.exports = {
    allUsers,
    getUser,
    updateUserRole,
    changePassword,
    changeProfilePhoto,
    addToPlaylist,
    removeFromPlaylist,
    updateProfile,
    forgetPassowrd,
    resetPassword,
}