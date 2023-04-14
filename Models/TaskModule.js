const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    title : String,
    body:String,
    completed : Boolean,
    user_id :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
})

module.exports = mongoose.model("Task",TaskSchema)