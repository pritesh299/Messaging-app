import { Request, Response } from 'express';
import User from '../models/user.js';
import { error } from 'console';

export async function getUsers(req: Request, res: Response) {

    const searchKeyword = req.body.Keyword;
    const userId=req.body.userId
  
    try {
        const user= await User.findOne({_id:userId})
        if(user){
        const contactList=user.contactList
       
        const userList = await User.find( {
            $and: [
              { email:{$regex: new RegExp(searchKeyword, 'i')} },
              { _id: { $nin: [...contactList,userId] } }
            ]
          });
   
        res.json({ userList });}
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

export async function getContacts(req:Request,res:Response){
    const userId =req.params.id
   try{
    const contactList=(await User.findOne({_id:userId}))?.contactList
    res.json(contactList)
   }catch(errror){

console.log(error)
   }
}


export async function getUser(req:Request,res:Response){
  const userId =req.params.id
 try{
  const user=await User.findOne({_id:userId})
   res.json(user)
 }catch(errror){

console.log(error)
 }
}

export async function addContact(req:Request,res:Response){
 
    let userId=req.body.userId
    let contact=req.body.ContactData
  
try{
  const user1=await User.findOne({_id:userId})
  const user2=await User.findOne({_id:contact._id})
  console.log(contact)
  if(user1 && user2){
      let response1= await user1.updateOne({contactList:[...user1.contactList,contact]})
       let response2= await user2.updateOne({contactList:[...user2.contactList,user1]})
      return res.json([response1,response2])

    } 

    res.json({msg:"user not found"})
 }catch(errror){
   console.log(error)
 } 
}