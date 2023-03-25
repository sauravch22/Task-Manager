const asyncHandler = require('express-async-handler')

const getAllTask = asyncHandler(async(req,res)=>{
    res.json({message:"Get All Task"})
})

const getOnetask = asyncHandler(async(req,res)=>{
    res.json({message : `Get Task ${req.params.id}`})
})

const addTask = asyncHandler(async(req,res)=>{
    res.json({message : "Task Added"})
})

const updateTask = asyncHandler(async(req,res)=>{
    res.json({message : `Updated task ${req.params.id}`})
})

const deleteTask = asyncHandler(async(req,res) =>{
    res.json({message : `Deleted Task ${req.params.id}`})
})

module.exports = {
    getAllTask,
    getOnetask,
    addTask,
    updateTask,
    deleteTask
}