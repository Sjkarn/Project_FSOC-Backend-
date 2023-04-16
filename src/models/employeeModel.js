const mongoose= require("mongoose")

const employeeSchema= new mongoose.Schema({
      name:{
        type:String,
        required:true,
        trim:true
      },
      phone:{
        type:String,
        required:true,
        unique:true,
        trim:true
      },
      email:{
        type:String,
        required:true,
        unique:true,
        trim:true
      },
      department:{
        type:String,
        required:true,
        trim:true
      },
      date:{
        type:String,
        required:true,
        trim:true
      },
      salary:{
        type:String,
        required:true,
        trim:true
      },
      image:{
        type:String,
        required:true,
        trim:true
      }
    },{timestamps:true})

module.exports= mongoose.model("employee", employeeSchema)