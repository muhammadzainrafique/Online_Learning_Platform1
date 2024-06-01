const asyncHandler = require('express-async-handler');
const createResponse = require('../utils/createRespones');
const Contact = require('../models/contact');

const saveMessage = asyncHandler(async (req, res)=>{
    const { name, email, message, userId } = req.body;
    if(!name || !email || !message)
        return createResponse(res, false, "All fields requried", 400);
    const newMessage = await Contact.create({name, email, message , userId:userId?.length && userId})
    if(!newMessage)
        return createResponse(res, false, "Invlaid Data", 400);
    createResponse(res, true, "Your Message is Successfully Recieved", 200)
})

module.exports = {
    saveMessage
}