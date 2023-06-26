const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");
var jwt = require('jsonwebtoken');
const userController = express.Router();
require('dotenv').config();

// Signup
userController.post("/signup", (req, res) => {
  const { email, password, age } = req.body;
  bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      res.status(404).json({ message: "Something went wrong, please try again" });
    }
    const user = new UserModel({
      email,
      password: hash,
      age,
    });
    await user.save();
    res.status(200).json({ message: "Signup Successful" });
  });
});

// Login
userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password
  bcrypt.compare(password, hash, function (err, result) {
    if(err){
        res.status(404).json({message:"Something went wrong, please try again"})
    }
    if(result){
        let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({message:"Login Successful",token})
    }else{
        res.status(404).json({message:"Invalid Credentials"})
    }
  });
});

module.exports = { userController };
