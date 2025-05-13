import { Request, Response } from 'express';
import { prisma }from '../server.js'
import { error } from 'console';

export async function getUser(req:Request,res:Response){
    const userId = parseInt(req.params.id)

    try{
      const user = await prisma.user.findUnique({where:{id:userId}})
      if(!user){
        res.status(404).json({msg:"User not found"})
      }
      res.json(user)
    }catch(errror){
      console.log(error)
    }
}

export async function updateUser(req:Request,res:Response){
  const userId = parseInt(req.params.id)
  const username = (req.body.username? req.body.username : null) 
  const email = (req.body.email? req.body.email : null) 
  const password = (req.body.password? req.body.password : null) 
  const avatar = (req.body.avatar? req.body.avatar : null) 

  try {
      let exist = await prisma.user.findUnique({where:{id:userId}});
      if (!exist) {
          return res.status(404).json({ msg: "User doesn't exists" });
      }

      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: (username? username: exist.name),
          email: (email? email: exist.email),
          password: (password? password: exist.password),
          avatar: (avatar? avatar: exist.avatar),
          updatedAt: new Date(),
        },
      });

    return res.status(200).json({ msg: "user updated successfully",user:updateUser});

  } catch (error:any) {
      console.error(error);
      res.status(500).json({msg:"Internal server error",error:error});
  }
}

export async function deleteUser(req:Request,res:Response){
  const  userId = parseInt(req.body.userId)
  try{
    const resposne = await prisma.user.delete({where:{id:userId}})
    return res.status(202).json({msg:"User is deleted successfully"})
  }catch(error){
    console.error(error);
    res.status(500).json({msg:"Internal server error",error:error});
  }
}

