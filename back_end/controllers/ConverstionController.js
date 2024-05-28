var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import conversation from "../models/Conversation.js";
export default function NewConvo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { creator, member } = req.body;
        try {
            let newConvo = new conversation({
                memberList: [creator, member],
                messageList: []
            });
            yield newConvo.save();
            res.status(201).json(newConvo);
        }
        catch (error) {
            console.log(error);
        }
    });
}
export function getConversation(id1, id2) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(id1, id2);
            const convo = yield conversation.findOne({ memberList: { $all: [id1, id2] } }).exec();
            if (!convo) {
                throw new Error("Conversation not found");
            }
            const messageList = convo.messageList;
            return { messageList, conversation: convo };
        }
        catch (error) {
            console.error(error);
            throw new Error("Internal server error");
        }
    });
}
