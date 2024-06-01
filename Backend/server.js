const express = require('express');
const getConnection = require('./config/getConnection');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary')
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 6000;
const hostname = '0.0.0.0'
getConnection();
cloudinary.v2.config({
    cloud_name:process.env.CLOUDNIARY_NAME,
    api_key:process.env.CLOUDNIARY_API,
    api_secret:process.env.CLOUDNIARY_SECRET
})
const allowedOrigins = [
    'http://localhost:5173',
    'http://192.168.15.101:5173',
]
app.use(cors({
    origin:(origin, callBack)=>{
      if(allowedOrigins.indexOf(origin) !== -1 || !origin)
      {
        callBack(null, true)
      }
      else{
        callBack(new Error('Not Allowed by CORS'))
      }
    },
    credentials: true 
  }));
app.use(cookieParser());
app.use(express.json());

app.use('/auth',require('./routes/authRoutes'));
app.use('/user',require('./routes/userRoutes'));
app.use('/course',require('./routes/courseRoute'));
app.use('/message',require('./routes/contactRoutes'));


app.use(errorHandler)





app.listen(PORT, hostname, ()=> console.log(`Server is running on Port : ${PORT}`));