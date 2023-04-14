const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async(userId) => {
    console.log("Inside Token")
    console.log(userId)
    const payload = {
        user: {
            id : userId
        }
    }
    let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:3600})
    return token
}