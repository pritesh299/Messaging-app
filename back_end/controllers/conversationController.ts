import { Request, Response } from 'express';
import { prisma }from '../server.js'
import { error } from 'console';
import Conversation from '../models/Conversation.js';

export async function createConversation(req:Request,res:Response){
    const userId1 = parseInt(req.body.userId1)
    const userId2 = parseInt(req.body.userId2)
  
    try{
      const user1 = await prisma.user.findUnique({where:{id:userId1}})
      const user2 = await prisma.user.findUnique({where:{id:userId2}})
      if(!user1 || !user2){
        return res.status(404).json({msg:"User not found"})
      }
  
      const memberList = [userId1,userId2].sort();
      const hashKey = memberList.join("_");
      let conversation = await Conversation.findOne({ hashKey });
      if (!conversation){
         conversation = await Conversation.create({
          memberList :memberList,
          hashKey :hashKey,
        })
      await conversation.save();
      return res.status(201).json({msg:"Conversation created successfully",conversation})
      }
      return res.status(200).json({msg:"Conversation already exists",conversation})  
    }catch(error){
      console.error(error);
      res.status(500).json({msg:"Internal server error",error:error});
    } 
  }
  export async function getConversations(req:Request,res:Response){
     const userId = parseInt(req.params.userId)
  
     try{
      const user = await prisma.user.findUnique({where:{id:userId}})
      if(!user){ 
        return res.status(404).json({msg:"User not found"})
      }
      const conversations = await Conversation.find({memberList:{$elemMatch:{$eq:userId}}})
      if(conversations.length===0){
        return res.status(404).json({msg:"No conversations found"})
      }
      return res.status(200).json({msg:"Conversations found",conversations})  
     }catch(error){
      console.error(error);
      res.status(500).json({msg:"Internal server error",error:error});
    }
  
  }