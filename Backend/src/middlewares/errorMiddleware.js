const errorHandler = (err, req, res, next) => {
    
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server error";

    // Mongoose Cast Error
    if(err.name === "CastError") {
        statusCode = 400,
        message = "Invalid ID format";
    }

    if(err.code === 11000){
        statusCode = 409,
        message = "A record with this value already exits";
    }

    return res.status(statusCode).json({
        success:false,
        error : message
    });
};

module.exports = errorHandler;