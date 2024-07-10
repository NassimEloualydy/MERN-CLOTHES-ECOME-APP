const express=require("express")
const Router=express.Router();
const {auth}=require("../middleware/auth")

const {addBasket,getMyBasket}=require("../controller/BasketController")

Router.post("/addBasket/:_id",auth,addBasket)
Router.post("/getMyBasket",auth,getMyBasket)
module.exports=Router
