const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
// const UserModel= require("../models/userModel");

const authentication= async function (req, res, next) {
    try {
      // check token : -
      let token = req.headers["x-api-key"];
      if (!token)
      return res.status(401).send({ status: false, msg: "Token Must be Filled" });
      
      // // verify token :
      jwt.verify(token, "Secret-key", (err, decodedToken) => {
        if (err)
        return res.status(400).send({ status: false, message: "Invalid token." });
        req.decodedToken = decodedToken;
        next();
      });
    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
};  

// const authorisation = async function (req, res, next) {
//   try {
//     const decodedToken = req.decodedToken;
//     const userId = req.params.userId;

//     if (!mongoose.isValidObjectId(userId))
//     return res.status(400).send({ status: false, message: "Invalid userId." });
    
//     const user = await UserModel.findOne({ _id: userId});
    
//     if (!user)
//     return res.status(404).send({ status: false, message: "user not found." });
    
//     if (user.userId != decodedToken.id)
//     return res.status(403).send({ status: false, message: "Not authorised." });
//     next();
//   } catch (error) {
//     res.status(500).send({ status: false, message: error.message });
//   }
// };

module.exports= {authentication}