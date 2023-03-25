const express = require("express")
const dotenv = require("dotenv").config()

const app = express()
port = process.env.PORT || 5001
app.use(express.json())
app.use("/api/v1/task",require("./routes/TaskRoute"))

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})