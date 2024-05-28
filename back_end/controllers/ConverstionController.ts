import conversation from "../models/Conversation.js";
import { Request, Response } from "express";

export  default async function  NewConvo(req:Request,res:Response){

    let {creator,member}=req.body

 try{
    let newConvo= new conversation({
        memberList:[creator,member],
        messageList:[]
 })

 await  newConvo.save()
 res.status(201).json(newConvo);

 }catch(error){
    console.log(error)
 }
}



export async function getConversation(id1: string, id2: string) {
    try {
        console.log(id1, id2);
        const convo = await conversation.findOne({ memberList: { $all: [id1, id2] } }).exec();

        if (!convo) {
            throw new Error("Conversation not found");
        }

        const messageList = convo.messageList;
        return { messageList, conversation: convo };
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}