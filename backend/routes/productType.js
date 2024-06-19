const express=require("express")
const Router=express.Router()
const {auth}=require("../middleware/auth")
const {submitProductType,getData,deleteProductType}=require("../controller/productTypeController")
Router.post("/submitProductType",auth,submitProductType)
Router.post("/getData/:offset",auth,getData);
Router.post("/deleteProductType/:_id",auth,deleteProductType);
module.exports=Router
