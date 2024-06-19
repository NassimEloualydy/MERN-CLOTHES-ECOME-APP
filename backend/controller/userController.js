const User = require("../models/User")
const joi=require("joi")
require("dotenv").config();
const jwt=require("jsonwebtoken")
exports.login=async (req,res)=>{
    const schema=new joi.object({
        "email":joi.string().required().messages({"any.required":"Please the email is required !!","string.empty":"Please the email is required !!"}),
        "password":joi.string().required().messages({"any.required":"Please the password is required !!","string.empty":"Please the password is required !!"})

    })
    const {email,password}=req.body
    const {error}=schema.validate({email,password})
    
    if(error)
        return res.status(400).json({err:error.details[0].message})
    var u=await User.findOne({email}).select()
    if(!u)
        return res.status(400).json({err:"Please the email is not found"})
    if(await u.matchPassword(password,u.password)==false)
        return res.status(400).json({err:"The password does not match"})

    const token=jwt.sign({u},process.env.JWT_SECRETE,{expiresIn:'30d'})
    return res.json({data:token,first_name:u.first_name,last_name:u.last_name,role:u.role})    

}

exports.singin=async (req,res)=>{
const {first_name,last_name,email,password,sexe,phone,date_of_birth}=req.body;
const schema=new joi.object({
    first_name:joi.string().required().messages({"string.empty":"Please the first name is required ","any.required":"Please the first name is required"}),
    last_name:joi.string().required().messages({"string.empty":"Please the last name is required ","any.required":"Please the last name is required"}),
    sexe:joi.string().required().messages({"string.empty":"Please the sexe is required ","any.required":"Please the sexe is required"}),
    phone:joi.string().required().messages({"string.empty":"Please the phone is required ","any.required":"Please the phone is required"}),
    date_of_birth:joi.string().required().messages({"string.empty":"Please the date of birth is required ","any.required":"Please the date of birth is required"}),
    email:joi.string().required().messages({"string.empty":"Please the email is required ","any.required":"Please the email` is required"}),
    password:joi.string().required().messages({"string.empty":"Please the password is required ","any.required":"Please the password is required"}),
})
const {error}=schema.validate({first_name,last_name,email,password,sexe,phone,date_of_birth});
if(error)
    return res.status(400).json({err:error.details[0].message})
var u=await User.find().and({first_name,last_name}).select()
if(u.length!=0)
    return res.status(400).json({err:"Please the first name and last name is already exist !!"})
u=await User.find({email}).select()
if(u.length!=0)
    return res.status(400).json({err:"Please the email is already exist !!"})
u=await User.find({phone}).select()
if(u.length!=0)
    return res.status(400).json({err:"Please the phone is already exist !!"})
u=await user.create({
    first_name:first_name,
    last_name:last_name,
    email:email,
    password:password,
    sexe:sexe,
    phone:phone,
    date_of_birth:date_of_birth,
})
if(u)
    return res.json({message:"Sigin in with success"})
    return res.status(400).json({err:u});
}