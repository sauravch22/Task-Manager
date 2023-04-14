const express = require("express")
const router = express.Router()
const {getAllTask,
    getOnetask,
    addTask,
    updateTask,
    deleteTask} = require("../Controllers/TaskController")

router.get("/get", getAllTask)

router.get("/get/:id", getOnetask)

router.post("/add", addTask)

router.patch("/update/:id", updateTask)

router.delete("/delete/:id", deleteTask)

module.exports = router