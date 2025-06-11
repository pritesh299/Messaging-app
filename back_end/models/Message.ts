import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversations",
    required: true
  },
  senderId: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isSent:{
    type: Boolean,
    default: false
  },
  isDelivered:{
    type: Boolean,
    default: false
  }
},
  {     
  timestamps: true // adds createdAt and updatedAt
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;
