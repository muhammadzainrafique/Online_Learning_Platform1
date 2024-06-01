
const errorHandler = (err, req, res, next)=>{
    console.log('error handler is called');
    console.log(err?.stack);

    const statusCode = res.statuscode? res.statuscode : 500;
    
    res.status(statusCode);

    res.json({
        Message:err?.message || "Something went wrong"
    })

}

module.exports = errorHandler;