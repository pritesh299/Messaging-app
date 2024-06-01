import { Request, Response } from "express";
import Message from "../models/message.js";



export  async function newMessage(req: Request, res: Response) {
    const { senderId, receiverId, message,seen,date,time } = req.body;
  
  try {
        const newMessage = new Message({senderId, receiverId, message,seen,date,time });
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
         const messageList= await Message.find({
            $or: [
              { $and:[{senderId: id1},{receiverId:id2}] },
              { $and:[{senderId: id2},{receiverId:id1}] },
            ]
          }
          )
                  res.json(messageList)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

