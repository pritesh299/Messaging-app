import mongoose from "mongoose";

const memberListValidator = {
    validator: function(array:mongoose.Schema.Types.ObjectId[]) {
      return array.length === 2;
    },
    message: 'memberList must contain exactly 2 members'
  };


const conversationSchema = new mongoose.Schema({
    memberList: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
        validate: memberListValidator
      },
}, { timestamps: true });

conversationSchema.index({ memberList: 1 }, { unique: true });


const Conversation= mongoose.model("Conversation",conversationSchema)

export default Conversation