const express = require("express")
const router = express.Router()

router.get("/getTask", (req,res)=>{
    res.json({message:"Get Task"})
})

router.post("/postTask", (req,res) =>{
    res.json("post task")
})

router.put("/updateTask", (req,res) => {
    res.json("Update Task")
})

module.exports = router