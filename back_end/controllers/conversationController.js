var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from '../server.js';
import Conversation from '../models/Conversation.js';
export function createConversation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId1 = parseInt(req.body.userId1);
        const userId2 = parseInt(req.body.userId2);
        try {
            const user1 = yield prisma.user.findUnique({ where: { id: userId1 } });
            const user2 = yield prisma.user.findUnique({ where: { id: userId2 } });
            if (!user1 || !user2) {
                return res.status(404).json({ msg: "User not found" });
            }
            const memberList = [userId1, userId2].sort();
            const hashKey = memberList.join("_");
            let conversation = yield Conversation.findOne({ hashKey });
            if (!conversation) {
                conversation = yield Conversation.create({
                    memberList: memberList,
                    hashKey: hashKey,
                });
                yield conversation.save();
                return res.status(201).json({ msg: "Conversation created successfully", conversation });
            }
            return res.status(200).json({ msg: "Conversation already exists", conversation });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error", error: error });
        }
    });
}
export function getConversations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.userId);
        try {
            const user = yield prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            const conversations = yield Conversation.find({ memberList: { $elemMatch: { $eq: userId } } });
            if (conversations.length === 0) {
                return res.status(404).json({ msg: "No conversations found" });
            }
            return res.status(200).json({ msg: "Conversations found", conversations });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error", error: error });
        }
    });
}
