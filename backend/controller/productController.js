const formidable=require("formidable")
const joi=require("joi")
const Product=require("../models/Product")
const productType=require("../models/ProductType")
const fs=require('fs')
exports.submitProduct=async (req,res)=>{
    
    const form=new formidable.IncomingForm()
    form.keepExtentions=true
    form.parse(req,async (err,fields,files)=>{
        if(fields._id==""){
            if(!files.photo_1)
                return res.status(400).json({err:"Please the first photo is required !!"})
            if(!files.photo_2)
                return res.status(400).json({err:"Please the second photo is required !!"})
            if(!files.photo_3)
                return res.status(400).json({err:"Please the thired photo is required !!"})
            if(!files.photo_4)
                return res.status(400).json({err:"Please the fourth photo is required !!"})
            if(!files.photo_5)
                return res.status(400).json({err:"Please the fifth photo is required !!"})
        }

        const {_id,name,description,price,category,qte,sizes,rating,status}=fields
        const schema=new joi.object({
            name:joi.string().required().messages({"string.empty":"Please the Name is required !!","any.required":"Please the Name is required !!"}),
            description:joi.string().required().messages({"string.empty":"Please the Description is required !!","any.required":"Please the Description is required !!"}),
            price:joi.string().required().messages({"string.empty":"Please the Price is required !!","any.required":"Please the Price is required !!"}),
            category:joi.string().required().messages({"string.empty":"Please the Category is required !!","any.required":"Please the Category is required !!"}),
            qte:joi.string().required().messages({"string.empty":"Please the Quantity is required !!","any.required":"Please the Quantity is required !!"}),
            sizes:joi.string().required().messages({"string.empty":"Please the Sizes is required !!","any.required":"Please the Sizes is required !!"}),
            rating:joi.string().required().messages({"string.empty":"Please the Rating is required !!","any.required":"Please the Rating is required !!"}),
            status:joi.string().required().messages({"string.empty":"Please the Status is required !!","any.required":"Please the Status is required !!"}),
        })
        if(_id!=""){
            const {error}=schema.validate({name,description,price,category,qte,sizes,rating,status})
            if(error)
                return res.status(400).json({err:error.details[0].message})
            var p=await Product.find().select("-photo_1 -photo_2 -photo_3 -photo_4 -photo_5").and([{name},{_id:{$ne:_id}}])  
            if(p.length!=0)
                return res.status(400).json({err:"Please the name is already required !!"}).and([{description},{_id:{$ne:_id}}]);
            p=await Product.find().select("-photo_1 -photo_2 -photo_3 -photo_4 -photo_5")  
            if(p.length!=0)
                return res.status(400).json({err:"Please the description is already required !!"});
    
            var data_sizes=[]
            for(var i=0;i<JSON.parse(sizes).length;i++){
                data_sizes.push(JSON.parse(sizes)[i].value)
            }
            const pr=await Product.findOneAndUpdate(
                {_id},
                {
                    $set:{

                        name,description,price,category,qte,sizes:""+data_sizes+"",rating,status,
                        photo_1:{
                            data:fs.readFileSync(files.photo_1.path),
                            contentType:files.photo_1.type
                        },
                        photo_2:{
                            data:fs.readFileSync(files.photo_2.path),
                            contentType:files.photo_2.type
                        },
                        photo_3:{
                            data:fs.readFileSync(files.photo_3.path),
                            contentType:files.photo_3.type
                        },
                        photo_4:{
                            data:fs.readFileSync(files.photo_4.path),
                            contentType:files.photo_4.type
                        },
                        photo_5:{
                            data:fs.readFileSync(files.photo_5.path),
                            contentType:files.photo_5.type
                        },
                    }
                
            },{new:true})
            if(pr)
                return res.json({msg:"Product Updated with success"})
                return res.status(400).json({err:pr})

        }else{

            const {error}=schema.validate({name,description,price,category,qte,sizes,rating,status})
            if(error)
                return res.status(400).json({err:error.details[0].message})
            var p=await Product.find({name}).select("-photo_1 -photo_2 -photo_3 -photo_4 -photo_5")  
            if(p.length!=0)
                return res.status(400).json({err:"Please the name is already required !!"});
            p=await Product.find({description}).select("-photo_1 -photo_2 -photo_3 -photo_4 -photo_5")  
            if(p.length!=0)
                return res.status(400).json({err:"Please the description is already required !!"});
    
            var data_sizes=[]
            for(var i=0;i<JSON.parse(sizes).length;i++){
                data_sizes.push(JSON.parse(sizes)[i].value)
            }
            const pr=await Product.create({
                name,description,price,category,qte,sizes:""+data_sizes+"",rating,status,
                photo_1:{
                    data:fs.readFileSync(files.photo_1.path),
                    contentType:files.photo_1.type
                },
                photo_2:{
                    data:fs.readFileSync(files.photo_2.path),
                    contentType:files.photo_2.type
                },
                photo_3:{
                    data:fs.readFileSync(files.photo_3.path),
                    contentType:files.photo_3.type
                },
                photo_4:{
                    data:fs.readFileSync(files.photo_4.path),
                    contentType:files.photo_4.type
                },
                photo_5:{
                    data:fs.readFileSync(files.photo_5.path),
                    contentType:files.photo_5.type
                },
    
            })
            if(pr)
                return res.json({msg:"Product Created with success"})
                return res.status(400).json({err:pr})
        }
    })
}

exports.getProductTypes=async (req,res)=>{
    const data= await  productType.find().select()
    if(data)
        return res.json({data})
        return res.status(400).json({err:data})
}
exports.getData=async (req,res)=>{
    const offset=req.params.offset
    const {name,price,category,qte,size,description,rating,status}=req.body
    const searchQuery={}
    // searchQuery.description={$regex:'.*'+description+'.*',$options:'i'}

    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'}
    searchQuery.price={$regex:'.*'+price+'.*',$options:'i'}
    // searchQuery.category={$regex:'.*'+category+'.*',$options:'i'}
    searchQuery.qte={$regex:'.*'+qte+'.*',$options:'i'}
    searchQuery.description={$regex:'.*'+description+'.*',$options:'i'}
    searchQuery.rating={$regex:'.*'+rating+'.*',$options:'i'}
    searchQuery.status={$regex:'.*'+status+'.*',$options:'i'}
    const data=await Product.find(searchQuery).select("-photo_1 -photo_2 -photo_3 -photo_4 -photo_5").populate([
    {
        path:'category',
        model:"ProductType",
        select:['_id','name'],
        match:{
            name:{$regex:'.*'+category+'.*',$options:'i'}
        }
    }
    ]).sort([['created','desc']]).limit(6).skip(offset)
    if(data){

            
            return res.json({data})
        }
    return res.status(400).json({err:data})
    
    
}
exports.getPhoto=async (req,res)=>{
    const _id=req.params._id
    const photo_n=req.params.photo_n
    const p=await Product.findOne({_id}).select()
    if(photo_n=="photo_1"){
        res.set('contentType',p.photo_1.contentType)
        return res.send(p.photo_1.data)
    }
    if(photo_n=="photo_2"){
        res.set('contentType',p.photo_2.contentType)
        return res.send(p.photo_2.data)
    }
    if(photo_n=="photo_3"){
        res.set('contentType',p.photo_3.contentType)
        return res.send(p.photo_3.data)
    }
    if(photo_n=="photo_4"){
        res.set('contentType',p.photo_4.contentType)
        return res.send(p.photo_4.data)
    }
    if(photo_n=="photo_5"){
        res.set('contentType',p.photo_5.contentType)
        return res.send(p.photo_5.data)
    }

}
exports.deleteProduct=async (req,res)=>{
    const _id=req.params._id
    const pr=await Product.findOneAndDelete({_id})
    if(pr)
        return res.json({msg:"Deleted with Success"})
    return res.status(400).json({err:pr})

}