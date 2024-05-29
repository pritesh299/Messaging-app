import mongoose from "mongoose";

const MessageSchema= new mongoose.Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    messageID:{type:String},
    senderId:{type:String},
    recieverId:{type:String},
    message:{type:String},
    seen:{type:Boolean}
},{
    timestamps:true
})

const Message= mongoose.model("Message",MessageSchema)

export default Message