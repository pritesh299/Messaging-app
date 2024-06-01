import { Request, Response } from 'express';
import User from '../models/user.js';
import { error } from 'console';

export async function getUsers(req: Request, res: Response) {

    const searchKeyword = req.params.Keyword;
    const currentUserId=req.params.userId

    try {
        const user= await User.findOne({_id:currentUserId})
        const contactList=user?.contactList
       
        const userList = await User.find( {
            $and: [
              { email:{$regex: new RegExp(searchKeyword, 'i')} },
              { contactList: { $nin: contactList } }
            ]
          });
        res.json({ userList });
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
