const express=require("express")
const {login,singin}=require("../controller/userController")
const {auth}=require("../middleware/auth")
const Route=express.Router()
Route.post("/login",login);
Route.post("/singin",singin);
module.exports=Route