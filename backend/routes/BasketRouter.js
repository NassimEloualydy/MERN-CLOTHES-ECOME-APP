const express=require("express")
const Router=express.Router();
const {auth}=require("../middleware/auth")

const {addBasket,ConfirmBakset,updatebasket,cancelBakset,deleteProductBasket,getMyBasket,getProductFromBasket}=require("../controller/BasketController")

Router.post("/addBasket/:_id",auth,addBasket)
Router.post("/getMyBasket",auth,getMyBasket)
Router.post("/getProductFromBasket",auth,getProductFromBasket);
Router.post("/updatebasket",auth,updatebasket);
Router.post("/deleteProductBasket/:_id",auth,deleteProductBasket)
Router.post("/cancelBakset",auth,cancelBakset)
Router.post("/ConfirmBakset",auth,ConfirmBakset)
module.exports=Router
