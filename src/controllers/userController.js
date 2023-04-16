const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const UserModel= require('../models/userModel');
const validator= require('../validators/validation');
let {isValidEmail,isValidPassword,isValidName}= validator;

const passwordHashing =async function(password){
    return new Promise((resolve, reject) => {
        const saltRounds = 10 //default
        bcrypt.hash(password, saltRounds, function (err, hash) {
    
          if (err) return  reject(res.status(400).send({ status: false, message: "invalid password" }))
          else return resolve(hash)
            
        });
    })
}

const login = async function (req, res) {
    try {
        let body = req.body
        if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: "Please enter some data" })
        if (!body.email || !body.password) return res.status(400).send({ status: false, message: "Please enter email and password" })
        
        if (!isValidEmail(body.email.trim())) return res.status(400).send({ status: false, msg: "please enter email correctly" })
        
        let findUser = await UserModel.find({ email: body.email.trim().toLowerCase(), password: body.password.trim().toLowerCase() })
        if (!findUser) return res.status(400).send({ status: false, message: "Invalid email or password" })
       
        let token = jwt.sign({ userId: findUser._id }, "Secret-key", { expiresIn: "24h" })
        return res.status(200).send({ status: true, message: "User login successfull", data: { userId: findUser._id, token } })
        
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message });
        }
}

const signUp= async function (req,res) {
    try {
        let body= req.body
        if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: "Please enter some data" })
        if (!body.name || !body.email || !body.password) return res.status(400).send({ status: false, message: "Please enter name, email and password" })

        if (!isValidName(body.name.trim())) return res.status(400).send({ status: false, msg: "please enter name correctly" })
        if (!isValidEmail(body.email.trim())) return res.status(400).send({ status: false, msg: "please enter email correctly" })
        if (!isValidPassword(body.password.trim())) return res.status(400).send({ status: false, msg: "please enter password correctly" })
        // encrypt the password
        body.password= await passwordHashing(body.password)
        let create= await UserModel.create(body)
        res.status(201).send({status:true, data:create})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });  
    }
}

module.exports= {login,signUp}