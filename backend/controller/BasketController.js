const Basket=require("../models/Basket")
const Product=require("../models/Product")
exports.addBasket=async (req,res)=>{
    const _id=req.params._id
    const user=req.user._id
    var b=await Basket.find().select().and([{user:user,product:_id,status:'In Progress'}])
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
        b =await Basket.findOne({user:user,status:'In Progress',product:_id})
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
    const data=await Basket.find().select().and([{user:user},{status:'In Progress'}])
    if(data)
            return res.json({data:data})
    return res.status(400).json({err:data})    
}
exports.getProductFromBasket=async (req,res)=>{
    const data=await Basket.find().select().and([
        {user:req.user._id},
        {status:"In Progress"},
    ]).populate([{
        model:'Product',
        path:'product',
        select:[
            'name',
            'price',
            'category',
            'qte',
            'sizes',
            'rating',
            'status',
            'description',
        ],
        populate:{
            path:'category',
            model:"ProductType",
            select:['_id','name'],
    
        }
    }])
    if(data)
        return res.json({data})
    
    return res.status(400).json({err:data})
    
}
exports.updatebasket=async (req,res)=>{
    const {_id,value}=req.body;
    const data=await Basket.findOneAndUpdate(
        {_id},
        {$set:{
            qte:value
        }},{$new:true}
    )   
    if(data)
        return res.json({msg:"Quantity Updated !!"})
    return res.status(400).json({err:data})
}
exports.deleteProductBasket=async (req,res)=>{
    const _id=req.params._id
    console.log(_id)
    const data=await Basket.findOneAndDelete({_id})
    if(data)
        return res.json({msg:"Product Deleted !!"}) 
    return res.status(400).json({err:data})
}
exports.cancelBakset=async (req,res)=>{
const data=await Basket.find().select().and([
    {user:req.user._id},
    {status:"In Progress"},   
])
var item=null
if(!data)
    return res.status(400).json({err:data})
    data.forEach( async (item)=>{
        item=await Basket.findByIdAndDelete({_id:item._id})
        if(!item)
            return res.status(400).json({err:item})
    })
    return res.json({msg:"Order Canceld with success"})
    
}
exports.ConfirmBakset=async (req,res)=>{
    const data=await Basket.find().select().and([
        {user:req.user._id},
        {status:"In Progress"},   
    ])

    const result=await Basket.updateMany({
        $and:[
            {user:req.user._id},
            {status:"In Progress"},   
    
        ]
    },{
        $set:{
            status:'Confirmed'

        }
    })
    if(result)
        return res.json({msg:"Order Confirmed with success"})
    return res.status(400).json({err:result})

}