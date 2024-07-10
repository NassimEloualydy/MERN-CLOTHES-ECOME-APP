const jwt=require("jsonwebtoken")
require("dotenv").config()
exports.auth=async (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(400).json({err:"Unauthorized user"})
    }
    const token=req.headers.authorization.split(" ")[1]
    const JWT_SECRETE=process.env.JWT_SECRETE
    const {u}=jwt.verify(token,JWT_SECRETE)
    req.user=u;
    next()
}