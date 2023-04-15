const asyncHandler = require('express-async-handler')
const Task = require("../Models/TaskModule")

const getAllTask = asyncHandler(async(req,res)=>{
    const allTask = await Task.find({Viewer_id:{$in : [req.user.id]}})
    if(!allTask){
        res.json({message:"No Task to display"})
    }
    else{
        res.json({message:"Get All Task",Tasks : allTask})
    }
})

const getOnetask = asyncHandler(async(req,res)=>{
    const task = await Task.findOne({_id:req.params.id,Viewer_id:{$in : [req.user.id]}})
    if(!task){
        res.json({message:"No Task to display"})
    }
    else{
    res.json({message : `Get Task ${req.params.id}`,TaskDetails : task})
    }
})

const addTask = asyncHandler(async(req,res)=>{
    console.log("Inside Task create service")
    const {title,body,completed} = (req.body)
    const task = await Task.create({
        title,
        body,
        completed,
        Editor_id : [req.user.id],
        Viewer_id : [req.user.id]
    })
    console.log(task)
    res.json({message : "Task Added",task:task})
})

const updateTask = asyncHandler(async(req,res)=>{
    console.log(req.body)
    if(req.body.type == "title"){
        const task = await Task.findOneAndUpdate({_id:req.params.id,Editor_id:{$in : [req.user.id]}},{title : req.body.content})
        if(!task){
            return res.json({message:"No Task to Update"})
        }
    }
    else if(req.body.type == "body"){
        const task = await Task.findOneAndUpdate({_id:req.params.id,Editor_id:{$in : [req.user.id]}},{body : req.body.content})
        if(!task){
            return res.json({message:"No Task to Update"})
        }
    }
    else{
        const task = await Task.findOneAndUpdate({_id:req.params.id,Editor_id:{$in : [req.user.id]}},{completed : true})
        if(!task){
           return res.json({message:"No Task to Update"})
        }
    }
    return res.json({message : `Updated task ${req.params.id}`})
})

const deleteTask = asyncHandler(async(req,res) =>{
    await Task.deleteOne({_id:req.params.id,Editor_id:{$in : [req.user.id]}})
    res.json({message : `Deleted Task ${req.params.id}`})
})

module.exports = {
    getAllTask,
    getOnetask,
    addTask,
    updateTask,
    deleteTask
}