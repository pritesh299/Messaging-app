import mongoose from "mongoose";
import bcrypt  from "bcryptjs"

const schema= new mongoose.Schema({
    usename:{type:String,require:true,unique:true} ,
    email:{type:String,require:true,unique:true},
    password:{require:true} 
})