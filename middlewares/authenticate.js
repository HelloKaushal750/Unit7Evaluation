require('dotenv').config()
const jwt = require('jsonwebtoken')


const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(404).json({ message: "Please Login" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if(err){
        res.status(404).json({message:"Please Login"})
    }else{
        req.body.userId = decoded.userId
        next();
    }
  });
};

module.exports = {authenticate}
