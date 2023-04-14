const jwt = require('jsonwebtoken')
require('dotenv').config()
const Token = require("../utils/token")
const User = require("../Models/UserModule")

module.exports = async(req,res,next) => {
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).send({ "message": 'No token, Authorization denied' })
    }
    try{
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decodeToken)
        let userResp = await User.findById(decodeToken.user.id)
        console.log("userResp", userResp)
        req.user = decodeToken.user
        req.token = await Token(req.user.id)
        next()
    }
    catch(e){
         console.log("Inside error", e)
         res.status(401).send({"message": 'Your session has been expired, Please login again' })
    }
} 
