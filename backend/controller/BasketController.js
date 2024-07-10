const Basket=require("../models/Basket")
const Product=require("../models/Product")
exports.addBasket=async (req,res)=>{
    const _id=req.params._id
    const user=req.user._id
    var b=await Basket.find().select().and([{user:user,product:_id}])
    if(b.length==0){
        b =await Basket.create({
               product:_id,
               qte:'1',
               user:user,
               status:"In Progress"
           })    
       if(b)
           return res.json({msg:"Added to basket"})
        return res.status(400).json({err:b})
    }
    if(b.length==1){
        b =await Basket.findOne({user:user,product:_id})
        var data=await Basket.findOneAndUpdate(
            {_id:b._id},
            {$set:{
                qte:""+(parseInt(b.qte)+1)+""
            }
        },{$new:true}
        )
        if(data)
            return res.json({msg:"Added with success"})
            return res.status(400).json({err:data})
    }
    
}       
exports.getMyBasket=async (req,res)=>{
    const user=req.user._id
    const data=await Basket.find({user:user}).select()
    var nbr=0
    data.forEach((item)=>{
        nbr=nbr+parseInt(item.qte)
    })
    if(data)
            return res.json({data:nbr})
    return res.status(400).json({err:data})    
}