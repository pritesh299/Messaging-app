"use strict";
/* import { request } from "http";
import Conversation from "../models/Conversation.js";
import { Request, Response } from "express";
import conversation from "../models/Conversation.js";
import User from "../models/user.js";

export   async function  newConverstion(req:Request,res:Response){
   
    const memberList= [req.params.id1,req.params.id2]

 try{
    console.log(memberList)
   let conversation = new Conversation({memberList})

     await conversation.save()

 }catch(error){
    console.log(error)
 }
}
 


export default async function getConversation(req:Request,res:Response) {
      
    const userId=req.params.id
        try{
          let conversation = await Conversation.find({memberList:userId})
            res.json(conversation)
        } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}A */ 
