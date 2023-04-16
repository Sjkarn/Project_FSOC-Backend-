const TaskModel= require("../models/taskModel");
const validators= require("../validators/validation");
let {isValid,isValidDate}= validators

const createEmployeeTask= async (req,res)=> {
    try {
        let body= req.body
        
        if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: "Please enter some data" })
        
        
        if (!isValid(body.name)) return res.status(400).send({ status: false, message: "please enter name correctly" })
        if (!isValid(body.task)) return res.status(400).send({ status: false, message: "please enter task correctly" })
        if (!isValid(body.task_details)) return res.status(400).send({ status: false, message: "please enter task_details correctly" })
        if (!isValidDate(body.assigned_date)) return res.status(400).send({ status: false, message: "please enter assigned_date correctly"})
        if (!isValidDate(body.start_date)) return res.status(400).send({ status: false, message: "please enter start_date correctly" })
        if (!isValidDate(body.end_date)) return res.status(400).send({ status: false, message: "please enter end_date correctly"})
        if (!isValid(body.status)) return res.status(400).send({ status: false, message: "please enter status correctly" })
        
        let create= await TaskModel.create(body)
        res.status(201).send({status:true, data:create})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getEmployeeTask= async (req,res)=> {
    try {
      let getEmployeeTaskDetails= await TaskModel.find().select({task:1,task_details:1,start_date:1,end_date:1,status:1,_id:0})
      res.status(200).send({status:true, data:getEmployeeTaskDetails})
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports= {createEmployeeTask,getEmployeeTask}