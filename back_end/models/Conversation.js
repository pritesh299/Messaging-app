import mongoose from "mongoose";
const minTwoMembersValidator = (val) => val.length >= 2;
const conversationSchema = new mongoose.Schema({
    memberList: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
        validate: {
            validator: minTwoMembersValidator,
            message: "memberList must contain at least 2 members"
        }
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: null // only used if isGroup === true
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}, { timestamps: true });
conversationSchema.index({ memberList: 1 }, {
    unique: true,
    partialFilterExpression: { isGroup: false } // only enforce uniqueness for 1-on-1
});
const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
