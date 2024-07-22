const express=require("express")
const Router=express.Router();
const {auth}=require("../middleware/auth")
const {generateToken}=require("../controller/BraintreeController")
Router.get("/generateToken",generateToken)
module.exports=Router