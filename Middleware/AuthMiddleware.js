const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

function authorizeUser(req,res,next) {
    const authorizationString = req.headers.authorization
    if (!authorizationString) {
        res.status(401).json({Message:"Login First"})
    }
    const stringToArray = authorizationString.split(" ")
    const token = stringToArray[1]
    if (token) {
        jwt.verify(token,process.env.TOKEN_SECRET,function (err,decoded) {
            if (err) {
                console.log("Error:", err) 
                return res.status(401).json({ Message: "Unauthorized user" })
            }
            if (decoded) {
                req.user = decoded;  
                console.log(decoded)              
                next();
              } 
        });
    }else{
        console.log("Invalid Authorization Header")
        res.status(401).json({Message:"Invalid authorization header"})
    }
}

module.exports=authorizeUser