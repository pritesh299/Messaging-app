import { Request, Response } from "express";
import mongoose from "mongoose";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export  async function createMessage(req: Request, res: Response) {
    let { conversationId, senderId, content,seen} = req.body;
    senderId = parseInt(senderId);
    seen = seen=='true' ? true : false;
    
  try {
        const conversation = await Conversation.find({conversationId});
        if(!conversation){
            return res.status(404).json({ msg: "conversation not found" });
        }
        const message = new Message({
            conversationId: conversationId,
            senderId: senderId,
            content: content,
            seen: seen,
        });
        await message.save();
        res.status(201).json({message:message,msg:"message has been registered"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    } 
}

export async function getMessages(req: Request, res: Response) {
    const conversationId = req.params.conversationId;
    try {
        const conversation = await Conversation.find({conversationId});
        if(!conversation){
            return res.status(404).json({ msg: "conversation not found" });
        }
        const response = await Message.find({ conversationId: conversationId });
        const messageList = response.map((message:any)=>{return {senderId:message.senderId,timestamp:message.updatedAt,content:message.content,seen:message.seen}})
        return res.status(200).json({msg:'obtained the message list ',messageList:messageList})
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export async function getLastMessage(req: Request, res: Response) {
    const conversationId = req.params.conversationId;
    const userId = req.params.userId;
    try {
        const conversation = await Conversation.find({conversationId});
        if(!conversation){
            return res.status(404).json({ msg: "conversation not found" });
        }
        const messageList = await Message.find({ conversationId: conversationId ,senderId:userId }).sort({ createdAt: -1 }).limit(1);

        return res.status(200).json({msg:'obtained the last message ',lastMessage:messageList[0]})
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}
