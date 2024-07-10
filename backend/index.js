const express=require("express");
const cors=require("cors")
const mongoose=require("mongoose")
require("dotenv").config();
const PORT=process.env.PORT || 6000
const app=express()

app.use(cors())
app.use(express.json())
const userRoutes=require("./routes/userRoutes")
const productTypeRoutes=require("./routes/productType")
const productRoutes=require("./routes/ProductRoutes");
const basketPorudct=require("./routes/BasketRouter")
app.use("/API/user",userRoutes);
app.use("/API/product",productRoutes);
app.use("/API/ProductType",productTypeRoutes);
app.use("/API/basket",basketPorudct);
const DATABASE=process.env.DATABASE

mongoose.connect(DATABASE).then(()=>{
    console.log("Database connected")
}).catch(err=>{
    console.log("Somthing went Wrong !!")
})

app.listen(PORT,()=>{
    console.log(`App Listen On Port ${PORT}`)
})