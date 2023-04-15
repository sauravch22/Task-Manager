const asyncHandler = require('express-async-handler')
const TaskUser = require("../Models/UserModule")
const bcrypt = require('bcrypt')
const gettoten = require("../utils/token")
const Task = require("../Models/TaskModule")

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
            res.json({user:user, status : true, token : await gettoten(user.id)})
        }
    }
})

exports.access = asyncHandler( async(req,res) => {
    const {mail, taskid ,type} = req.body
    console.log(mail," ",taskid," ",type)
    const user = await TaskUser.findOne({mail})
    if(!user){
        return res.json({message : "User with mail Id not found"})
    }
    const task = await Task.findOne({_id:taskid,Editor_id:{$in : [req.user.id]}})
    if(!task){
        return res.json({message : "Task not found "})
    }
    if(type=="Editor"){
        await Task.findOneAndUpdate({_id:taskid},{$addToSet:{Editor_id:user._id}})
        return res.json({message : `${user.mail} can now start editing`})
    }
    if(type=="Viewer"){
        await Task.findOneAndUpdate({_id:taskid},{$addToSet:{Viewer_id:user._id}})
        return res.json({message : `${user.mail} can now start viewing`})
    }
})