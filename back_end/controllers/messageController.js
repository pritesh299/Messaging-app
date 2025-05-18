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
export function createMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { conversationId, senderId, content, seen } = req.body;
        senderId = parseInt(senderId);
        seen = seen == 'true' ? true : false;
        console.log(conversationId, senderId, content, seen);
        try {
            const conversation = yield Conversation.find({ conversationId });
            if (!conversation) {
                return res.status(404).json({ msg: "conversation not found" });
            }
            const message = new Message({
                conversationId: conversationId,
                senderId: senderId,
                content: content,
                seen: seen,
            });
            yield message.save();
            res.status(201).json({ message: message, msg: "message has been registered" });
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
            const messageList = response.map((message) => { return { senderId: message.senderId, timestamp: message.updatedAt, content: message.content, seen: message.seen }; });
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
            const messageList = yield Message.find({ conversationId: conversationId, senderId: userId }).sort({ createdAt: -1 }).limit(1);
            return res.status(200).json({ msg: 'obtained the last message ', lastMessage: messageList[0] });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
        }
    });
}
