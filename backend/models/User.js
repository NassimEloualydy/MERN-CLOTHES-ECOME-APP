const mongoose=require("mongoose")
const bcryptjs=require("bcryptjs")
const userSchema=mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    sexe:{type:String,required:true},
    phone:{type:String,required:true},
    date_of_birth:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
},{timestamps:true})

userSchema.methods.matchPassword=async (entered_password,password)=>{
 return await bcryptjs.compare(entered_password,password)   
}

userSchema.pre("save",async function(next){
  const salt =await bcryptjs.genSalt(10)
  this.password=await bcryptjs.hash(this.password,salt)  
})
module.exports=mongoose.model("User",userSchema);
