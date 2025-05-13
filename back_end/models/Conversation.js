import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema({
    memberList: {
        type: [Number], // Array of integers (Postgres user IDs)
        required: true,
        validate: {
            validator: (val) => val.length === 2,
            message: "memberList must contain exactly 2 user IDs"
        }
    },
    hashKey: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true });
conversationSchema.index({ hashKey: 1 }, { unique: true });
const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema);
export default Conversation;
