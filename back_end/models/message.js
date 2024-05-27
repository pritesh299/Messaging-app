import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
    messageID: { type: String },
    senderId: { type: String },
    recieverId: { type: String },
    message: { type: String },
    type: { type: String }
}, {
    timestamps: true
});
const message = mongoose.model("Message", MessageSchema);
export default message;
