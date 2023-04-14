const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const {getAllTask,
    getOnetask,
    addTask,
    updateTask,
    deleteTask} = require("../Controllers/TaskController")

router.get("/get", auth, getAllTask)

router.get("/get/:id", auth, getOnetask)

router.post("/add", auth, addTask)

router.patch("/update/:id", auth, updateTask)

router.delete("/delete/:id", auth, deleteTask)

module.exports = router