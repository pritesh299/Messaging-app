import { Request, Response } from "express";
import Message from "../models/message.js";


export default async function newMessage(req: Request, res: Response) {
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
