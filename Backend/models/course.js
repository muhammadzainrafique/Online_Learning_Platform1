const mongoose = require('mongoose');
const titleValidation = {
    type:String, 
    required:true,
    minlength:4,
    maxlength:100
}
const descriptionValidation = {
    type:String, 
    required:true, 
    minlength:20,
}

const courseSchema = new mongoose.Schema({
    title:titleValidation,
    description:descriptionValidation,
    price:{
        type:Number,
        required:true
    },
    lessons:[
        {
            title:titleValidation,
            description:descriptionValidation,
            videoLink:{
                type:String,
                required:true
            },
        }
    ],
    poster: {
        id:{
            type:String,
        },
        url:{
            type:String,
        }
    },
    views:{
        type:Number, 
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
    },
    students:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users',
        }
    ],
    category:{
        type:String,
        required:true
    }

},
{
    timestamps:true
})


module.exports = mongoose.model("Courses", courseSchema);