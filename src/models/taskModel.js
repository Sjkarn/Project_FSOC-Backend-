const mongoose= require("mongoose")

const taskSchema= new mongoose.Schema({
      name:{
        type:String,
        required:true,
        trim:true
      },
      task:{
        type:String,
        required:true,
        trim:true
      },
      task_details:{
        type:String,
        required:true,
        trim:true
      },
      assigned_date:{
        type:String,
        required:true,
        trim:true
      },
      start_date:{
        type:String,
        required:true,
        trim:true
      },
      end_date:{
        type:String,
        required:true,
        trim:true
      },
      status:{
        type:String,
        required:true,
        trim:true
      },
    },{timestamps:true})

module.exports= mongoose.model("task_details", taskSchema)