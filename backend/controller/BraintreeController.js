const braintree=require("braintree")
require("dotenv").config()
const stripe = require('stripe')('sk_test_51Pn4iDHcKVRDweYXvQ6QNRqRXICvlg4F2zCczpTmsosEVDyOvvNeZJlqjpvzyeDiTN8isMQfdcMe2WEN39MeuwSw00JBL7yQLo'); // Use your Stripe Secret Key

const getway=new braintree.BraintreeGateway({

    environment:braintree.Environment.Sandbox,
merchantId:process.env.merchantId,
privateKey:process.env.privateKey,
publicKey:process.env.publicKey


})
exports.generateToken= async (req,res)=>{
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 500, // amount in cents (e.g., 5000 = $50.00)
        currency: 'usd', // or another currency you want
        payment_method_types: ['card'],
      });
    // getway.clientToken.generate({},(err,response)=>{
    //    return res.json({token:response.clientToken})
    // })
    return res.json({
        client_secret:paymentIntent.client_secret
    })
    console.log()
}
