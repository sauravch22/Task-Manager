const asyncHandler = require('express-async-handler')
const Task = require("../Models/TaskModule")

const getAllTask = asyncHandler(async(req,res)=>{
    const allTask = await Task.find()
    if(!allTask){
        res.json({message:"No Task to display"})
    }
    else{
        res.json({message:"Get All Task",Tasks : allTask})
    }
})

const getOnetask = asyncHandler(async(req,res)=>{
    const task = await Task.findById(req.params.id)
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
        completed
    })
    res.json({message : "Task Added",task:task})
})

const updateTask = asyncHandler(async(req,res)=>{
    const task = await Task.findByIdAndUpdate(req.params.id,{completed : true})
    if(!task){
        res.json({message:"No Task to display"})
    }
    else{
    res.json({message : `Updated task ${req.params.id}`})
    }
})

const deleteTask = asyncHandler(async(req,res) =>{
    await Task.deleteOne({_id:req.params.id})
    res.json({message : `Deleted Task ${req.params.id}`})
})

module.exports = {
    getAllTask,
    getOnetask,
    addTask,
    updateTask,
    deleteTask
}