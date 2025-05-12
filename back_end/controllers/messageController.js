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
export function newMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { senderId, receiverId, message, seen, date, time } = req.body;
        try {
            const newMessage = new Message({ senderId, receiverId, message, seen, date, time });
            yield newMessage.save();
            res.status(201).json({ message: newMessage, msg: "message has been register" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
        }
    });
}
export function getMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id1, id2 } = req.params;
            const messageList = yield Message.find({
                $or: [
                    { $and: [{ senderId: id1 }, { receiverId: id2 }] },
                    { $and: [{ senderId: id2 }, { receiverId: id1 }] },
                ]
            });
            res.json(messageList);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
        }
    });
}
