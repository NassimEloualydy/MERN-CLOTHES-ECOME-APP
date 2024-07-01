const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema
const productSchema= new mongoose.Schema({
    photo_1:{data:Buffer,contentType:String},
    photo_2:{data:Buffer,contentType:String},
    photo_3:{data:Buffer,contentType:String},
    photo_4:{data:Buffer,contentType:String},
    photo_5:{data:Buffer,contentType:String},
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    category:{type:ObjectId,ref:"ProductType",required:true},
    qte:{type:String,required:true},
    sizes:{type:String,required:true},
    rating:{type:String,required:true},
    status:{type:String,required:true},
    description:{type:String,required:true},

},{timstamps:true})
module.exports=mongoose.model("Product",productSchema);
