var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import { io, users } from "../server.js";
export function createMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { conversationId, senderId, content } = req.body;
        senderId = parseInt(senderId);
        try {
            const conversation = yield Conversation.find({ conversationId });
            if (!conversation) {
                return res.status(404).json({ msg: "conversation not found" });
            }
            let message = new Message({
                conversationId: conversationId,
                senderId: senderId,
                isSent: true,
                content: content,
                updatedAt: new Date(),
            });
            const reciever = users.find(user => user.userId === senderId);
            const savedResponse = yield message.save();
            if (reciever) {
                io.to(reciever.socketId).emit('new-message', {
                    _id: savedResponse._id,
                    senderId: savedResponse.senderId,
                    content: savedResponse.content,
                    isRead: savedResponse.isRead,
                    isSent: savedResponse.isSent,
                    isDelivered: savedResponse.isDelivered,
                    timestamp: savedResponse.updatedAt,
                    conversationId: savedResponse.conversationId
                });
            }
            res.status(201).json({ message: savedResponse, msg: "message has been registered" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    });
}
export function getMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conversationId = req.params.conversationId;
        try {
            const conversation = yield Conversation.find({ conversationId });
            if (!conversation) {
                return res.status(404).json({ msg: "conversation not found" });
            }
            const response = yield Message.find({ conversationId: conversationId });
            const messageList = response.map((message) => {
                return {
                    _id: message._id,
                    senderId: message.senderId,
                    content: message.content,
                    isRead: message.isRead,
                    isSent: message.isSent,
                    isDelivered: message.isDelivered,
                    timestamp: message.updatedAt,
                    conversationId: message.conversationId,
                };
            });
            return res.status(200).json({ msg: 'obtained the message list ', messageList: messageList });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
        }
    });
}
export function getLastMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conversationId = req.params.conversationId;
        const userId = req.params.userId;
        try {
            const conversation = yield Conversation.find({ conversationId });
            if (!conversation) {
                return res.status(404).json({ msg: "conversation not found" });
            }
            const messageList = yield Message.find({ conversationId: conversationId }).sort({ updatedAt: -1 }).limit(1);
            return res.status(200).json({ msg: 'obtained the last message ', lastMessage: messageList[0] });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
        }
    });
}
export function makeMessagesRead(conversationId, fromUserId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conversation = yield Conversation.find({ conversationId });
            if (!conversation) {
                return { msg: "Conversation not found" };
            }
            yield Message.updateMany({ conversationId: conversationId, senderId: fromUserId }, { $set: { isRead: true, isDelivered: true } });
            const updatedMessages = yield Message.find({
                conversationId: conversationId,
                senderId: fromUserId
            });
            const sender = users.find(user => user.userId === fromUserId);
            if (!sender) {
                return { msg: "Sender not found" };
            }
            updatedMessages.forEach((message) => {
                io.to(sender.socketId).emit('mark-read', message._id);
            });
            return { msg: "All messages in the conversation have been marked as read" };
        }
        catch (error) {
            console.error(error);
            return { msg: "Internal server error" };
        }
    });
}
export function makeMessageDelivered(messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = yield Message.findById(messageId);
            if (!message) {
                return { msg: "Message not found" };
            }
            message.isDelivered = true;
            let response = yield message.save();
            io.to(message.conversationId.toString()).emit('message delivered confirmation', messageId);
            return { msg: "Message marked as delivered", message: response };
        }
        catch (error) {
            console.error(error);
            return { msg: "Internal server error", message: null };
        }
    });
}
export function makeMessageRead(messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = yield Message.findById(messageId);
            if (!message) {
                return { msg: "Message not found" };
            }
            message.isRead = true;
            message.isDelivered = true;
            let response = yield message.save();
            io.to(message.conversationId.toString()).emit('message delivered confirmation', messageId);
            return { msg: "Message marked as read", message: response };
        }
        catch (error) {
            console.error(error);
            return { msg: "Internal server error", message: null };
        }
    });
}
