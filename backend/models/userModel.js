import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}

},{minimize:false})

// create a Mongoose model for the "user" collection in a MongoDB database.
const userModel= mongoose.models.user || mongoose.model("user",userSchema);


export default userModel;