const jwt = require("jsonwebtoken");

function protect(req,res,next){

    try{

    const authHeader = req.header("Authorization");

    if(!authHeader){
        return res.status(401).json({
            error: "Access denied. No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    console.log(token);

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

    }catch(error){
        return res.status(401).json({
            error:"Invalid or expired token"
        });
    }

};

module.exports = protect;