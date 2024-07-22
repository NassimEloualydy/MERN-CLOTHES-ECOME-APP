const braintree=require("braintree")
require("dotenv").config()
const getway=new braintree.BraintreeGateway({

    environment:braintree.Environment.Sandbox,
merchantId:process.env.merchantId,
privateKey:process.env.privateKey,
publicKey:process.env.publicKey


})
exports.generateToken=(req,res)=>{
    getway.clientToken.generate({},(err,response)=>{
       return res.json({token:response.clientToken})
    })
}
