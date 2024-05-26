import express from "express"
import connectDB from "./config/db.js"


const port=5000;
const app = new express();
 
 console.log( await connectDB())

app.listen(port,()=>{
    console.log("serever is running on port: "+ port)
}) 


