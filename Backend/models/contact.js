const mongoose = require('mongoose');

const contactSechema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    message:{
        type:String, 
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        default:'guest'
    },
},
{
    timestamps:true
})

module.exports = mongoose.model('Contacts', contactSechema);