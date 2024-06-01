import mongoose from "mongoose";

const MessageSchema= new mongoose.Schema({
    senderId:{type:mongoose.Schema.ObjectId,ref:"User"},
    receiverId:{type:mongoose.Schema.ObjectId,ref:"User"},
    message:{type:String},
    seen:{type:Boolean},
    date:{type:Date},
    time:{type:String}
},{
    timestamps:true
})

const Message= mongoose.model("Message",MessageSchema)

export default Message