import mongoose from "mongoose";

//connectDB function, which connects to a MongoDB database using Mongoose. 
export const connectDB  = async ()=>{
    await mongoose.connect('mongodb+srv://delphine:delphine12345@cluster0.1luys5u.mongodb.net/mid-term').then(()=>console.log("DB connected"));

}