import { Request, Response } from "express";
import mongoose from "mongoose";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import { io, users } from "../server.js";
import { timeStamp } from "console";

export  async function createMessage(req: Request, res: Response) {
    let { conversationId, senderId, content} = req.body;
    senderId = parseInt(senderId);

  try {
        const conversation = await Conversation.find({conversationId});
        if(!conversation){
            return res.status(404).json({ msg: "conversation not found" });
        }

        let message = new Message({
            conversationId: conversationId,
            senderId: senderId,
            isSent: true,
            content: content,
            updatedAt: new Date(),
        });
        const savedResponse = await message.save();
        io.to(conversationId).emit('new message',{
          _id: savedResponse._id,
          senderId: savedResponse.senderId,
          content: savedResponse.content,
          isRead: savedResponse.isRead,
          isSent: savedResponse.isSent,
          isDelivered: savedResponse.isDelivered,
          timestamp: savedResponse.updatedAt,
          conversationId: savedResponse.conversationId
        }); 

        res.status(201).json({message:savedResponse,msg:"message has been registered"});
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
        const messageList = await Message.find({ conversationId: conversationId }).sort({updatedAt: -1}).limit(1);
        return res.status(200).json({msg:'obtained the last message ',lastMessage:messageList[0]})
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export async function makeMessageRead(conversationId: string, fromUserId: number) {
    try {
        const conversation = await Conversation.find({conversationId});
        if (!conversation) {
            return { msg: "Conversation not found" };
        }

        await Message.updateMany(
            { conversationId: conversationId, senderId:  fromUserId },
            { $set: { seen: true } }
        );

        const updatedMessages = await Message.find({
            conversationId: conversationId,
            senderId: fromUserId 
        });


        io.to(conversationId).emit('message read', { conversationId });

        return { msg: "All messages in the conversation have been marked as read" };
    } catch (error) {
        console.error(error);
        return { msg: "Internal server error" };
    }
}

export async function makeMessageDelivered(messageId: string) {
    try {
        const message = await Message.findById(messageId);
        if (!message) {
            return { msg: "Message not found" };
        }
        message.isDelivered = true;
        let response = await message.save();
        console.log("message delivered",response)
        io.to(message.conversationId.toString()).emit('message delivered confirmation', messageId );
        return { msg: "Message marked as delivered" };
    } catch (error) {
        console.error(error);
        return { msg: "Internal server error" };
    }
}
