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
      console.log(paymentIntent)
    // getway.clientToken.generate({},(err,response)=>{
    //    return res.json({token:response.clientToken})
    // })
    // console.log(paymentIntent)
    // const paymentMethod = await stripe.paymentMethods.create({
    //     type: 'card',
    //     card: {
    //       number: '4444444444444441', // Replace with actual card details (this is a test card)
    //       exp_month: 12,
    //       exp_year: 2024,
    //       cvc: '123',
    //     },
    //     billing_details: {
    //       name: 'Cardholder Name',
    //     },
    //   });
  
    //   console.log('PaymentMethod ID:', paymentMethod.id);
  
    return res.json({
        client_secret:paymentIntent.client_secret
    })
}
