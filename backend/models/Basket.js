const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema
const basket=new mongoose.Schema({
  product:{type:ObjectId,ref:"Product",required:true},
  qte:{type:String,required:true},  
  user:{type:ObjectId,ref:"User",required:true},
  status:{type:String,required:true}
},{timestamps:true})

module.exports=mongoose.model("Basket",basket)
