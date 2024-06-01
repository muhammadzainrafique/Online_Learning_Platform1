const mongoose = require('mongoose');

const userSechema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String, 
        required:true
    },
    role:{
        type:String,
        enum:["student", "admin", "instructor"],
        default:"student",
    },
    subscription:{
        type:String,
        enum:["enrolled", "unenrolled"],
        default:"unenrolled", 
    },
    playlist:[
    {
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Courses',
        },
        enrollmentDate: {
            type: Date,
            default: Date.now
        }
    },
    ],
    photo:{
        type:String,
        default:"Avatar",
    },
    ResetPasswordToken:{
        type:String
    },
    ResetPasswordToken:{
        type:Date
    }

},
{
    timestamps:true
})

module.exports = mongoose.model('Users', userSechema);