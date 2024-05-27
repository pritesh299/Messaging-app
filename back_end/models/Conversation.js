import mongoose from "mongoose";
const ConvoSchema = new mongoose.Schema({
    memberList: { type: Array },
    messageList: { type: Array }
}, {
    timestamps: true
});
const conversation = mongoose.model("Conversation", ConvoSchema);
export default conversation;
