const Product=require("../models/Product")
const express=require("express")
const Router=express.Router();
const {auth}=require("../middleware/auth")
const {submitProduct,deleteProduct,getPhoto,getData,getProductTypes}=require("../controller/productController")
Router.post("/submitProduct",auth,submitProduct);
Router.post("/getProductTypes",auth,getProductTypes);
Router.post("/getData/:offset",auth,getData);
Router.get('/getPhoto/:_id/:photo_n',getPhoto)
Router.post("/deleteProduct/:_id",auth,deleteProduct);
module.exports=Router
