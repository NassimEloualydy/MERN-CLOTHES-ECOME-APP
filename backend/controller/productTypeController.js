const ProductType=require("../models/ProductType")
const joi=require("joi")
exports.submitProductType= async (req,res)=>{
    const {name,description,color,_id}=req.body
    if(_id!=""){
        const schema=new joi.object({
            name:joi.string().required().messages({"string.empty":"Please the name is required !!","any.required":"Please the name is required !!"}),
            description:joi.string().required().messages({"string.empty":"Please the description is required !!","any.required":"Please the description is required !!"}),
            color:joi.string().required().messages({"string.empty":"Please the color is required !!","any.required":"Please the color is required !!"}),
        })
        const {error}=schema.validate({name,description,color})
        if(error)
            return res.status(400).json({err:error.details[0].message})
        var p=await ProductType.find().select().and([{name},{_id:{$ne:_id}}])
        if(p.length!=0)
            return res.status(400).json({err:"Please the name is already exist "})
        p=await ProductType.find().select().and([{description},{_id:{$ne:_id}}])
        if(p.length!=0)
            return res.status(400).json({err:"Please the description is already exist "})
        p=await ProductType.find().select().and([{color},{_id:{$ne:_id}}])
        
        if(p.length!=0)
            return res.status(400).json({err:"Please the color is already exist "})
        p=await ProductType.findOneAndUpdate(
            {_id},
            {$set:{
                name,description,color
            }},{new:true}
        )
        if(p)
            return res.json({msg:"Updated with success"})
        return res.status(400).json({err:p})
    }else{

        const schema=new joi.object({
            name:joi.string().required().messages({"string.empty":"Please the name is required !!","any.required":"Please the name is required !!"}),
            description:joi.string().required().messages({"string.empty":"Please the description is required !!","any.required":"Please the description is required !!"}),
            color:joi.string().required().messages({"string.empty":"Please the color is required !!","any.required":"Please the color is required !!"}),
        })
        const {error}=schema.validate({name,description,color})
        if(error)
            return res.status(400).json({err:error.details[0].message})
        var p=await ProductType.find({name}).select()
        if(p.length!=0)
            return res.status(400).json({err:"Please the name is already exist "})
        p=await ProductType.find({description}).select()
        if(p.length!=0)
            return res.status(400).json({err:"Please the description is already exist "})
        p=await ProductType.find({color}).select()
        
        if(p.length!=0)
            return res.status(400).json({err:"Please the color is already exist "})
        p=await ProductType.create({
            name,description,color
        })
        if(p)
            return res.json({msg:"Added with success"})
        return res.status(400).json({err:p})
    }
}
exports.getData=async (req,res)=>{
    const {name,description}=req.body;
    const offset=req.params.offset
    const searchQuery={}
    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'}
    searchQuery.description={$regex:'.*'+description+'.*',$options:'i'}
    const data=await ProductType.find(searchQuery).select().sort([['createdAt','desc']]).limit(6).skip(offset)
    if(data)
        return res.json({data})
    return res.status(400).json({err:data})
}
exports.deleteProductType= async (req,res)=>{
    const _id=req.params._id
    const p=await ProductType.findOneAndDelete(_id)
    if(p)
        return res.json({msg:"Deleted with success"})
    return res.status(400).json({err:p})

}