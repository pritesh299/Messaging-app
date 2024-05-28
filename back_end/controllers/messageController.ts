import { Request, Response } from "express";
import Message from "../models/message.js";
import { getConversation } from "./ConverstionController.js";


export  async function newMessage(req: Request, res: Response) {
    const { conversationId,senderId, receiverId, message, seen } = req.body;
    console.log(req.body)
    try {
        const newMessage = new Message({conversationId,senderId, receiverId, message, seen });
        await newMessage.save();
        res.status(201).json({message:newMessage,msg:"message has been register"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export async function getMessages(req: Request, res: Response) {
    try {
        const { id1, id2 } = req.params;
        const { messageList, conversation: convo } = await getConversation(id1, id2);

        res.json({ messageList, conversation: convo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}
