const asyncHandler = require('express-async-handler')
const TaskUser = require("../Models/UserModule")
const bcrypt = require('bcrypt')

exports.createUser = asyncHandler(async(req,res) => {
    const {name,mail,password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    const finduser = await TaskUser.findOne({mail})
    if(!finduser){
        const user = await TaskUser.create({
            name,
            mail,
            password : hashedPassword
        })
        res.json({message: "User registered", data: user})
    }
    else{
        res.json({message:"Register with different email Id"})
    }
})

exports.login = asyncHandler( async(req,res) =>{
    const {mail,password} = req.body
    const user = await TaskUser.findOne({mail})
    if(!user){
        res.json({message:"Mail Id not found"})
    }
    else{
        const comppassword = await bcrypt.compare(password,user.password)
        if(!comppassword){
            res.json({ msg: "Incorrect Password", status: false });
        }
        else{
            res.json({user:user, status : true})
        }
    }
})