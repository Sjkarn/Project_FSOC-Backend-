const EmployeeModel= require("../models/employeeModel");
const validators= require("../validators/validation");
const { uploadFile } = require('../aws/s3Service')
let {isValid,isValidPhone,isValidEmail,isValidDate}= validators

const createEmployee= async (req,res)=> {
    try {
        let body= req.body
        let files= req.files;
        
        if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: "Please enter some data" })
        
        if (files.length == 0) return res.status(400).send({ status: false, message: "image  is mandatory" });

        if (!isValid(body.name)) return res.status(400).send({ status: false, message: "please enter name correctly" })
        if (!isValidPhone(body.phone)) return res.status(400).send({ status: false, message: "please enter phone correctly" })
        if (!isValidEmail(body.email)) return res.status(400).send({ status: false, message: "please enter email correctly"})
        if (!isValid(body.department)) return res.status(400).send({ status: false, message: "please enter department correctly" })
        if (!isValidDate(body.date)) return res.status(400).send({ status: false, message: "please enter date correctly"})
        
        
        const email = await EmployeeModel.findOne({ email: body.email });
        if (email) return res.status(400).send({ status: false, message: "email already exist" })
        const phone = await EmployeeModel.findOne({ phone: body.phone });
        if (phone) return res.status(400).send({ status: false, message: "phone already exist" })

        if (files.length > 0) {
            var uploadedFileURL = await uploadFile(files[0]);
          } else {
            return res.status(400).send({ status: false, message: "No file found, it is mandatory" });
          }
          body.image = uploadedFileURL
        let create= await EmployeeModel.create(body)
        res.status(201).send({status:true, data:create})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getEmployee= async (req,res)=> {
  try {
    let getEmployeeDetails= await EmployeeModel.find().select({name:1,phone:1,email:1,date:1,salary:1,_id:0})
    res.status(200).send({status:true, data:getEmployeeDetails})
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

module.exports= {createEmployee,getEmployee}