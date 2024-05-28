import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema({
    memberList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messageList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
}, { timestamps: true });
const conversation = mongoose.model("Conversation", conversationSchema);
export default conversation;
