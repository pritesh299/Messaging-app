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



export async function getConversation(req:Request,res:Response) {

    try {
        console.log("dkfg")
    } catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
}