const mongoose=require("mongoose")
const ProductTypeSchema=mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    color:{type:String,required:true},
},{timestamps:true})
module.exports=mongoose.model('ProductType',ProductTypeSchema)