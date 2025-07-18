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
      const userData = {
        username:user?.username,
        id:user?.id,
        avatar:user?.avatar
      }
      res.json(userData)
    }catch(errror){
      console.log(error)
    }
}
export async function updateUser(req:Request,res:Response){
  const userId = parseInt(req.body.id)
  const username = (req.body.username? req.body.username : null) 
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
          username: (username? username: exist.username),
          avatar: (avatar? avatar: exist.avatar),
          updatedAt: new Date(),
        },
      });

    return res.status(200).json({ msg: "user updated successfully",user:{username:updateUser.username,avatar:updateUser.avatar,userId:updateUser.id},code:0});

  } catch (error:any) {
      console.error(error);
      res.status(500).json({msg:"Internal server error",error:error});
  }
}

export async function deleteUser(req:Request,res:Response){
  const  userId = parseInt(req.params.userId)
  try{
    const resposne = await prisma.user.delete({where:{id:userId}})
    return res.status(202).json({msg:"User is deleted successfully"})
  }catch(error){
    console.error(error);
    res.status(500).json({msg:"Internal server error",error:error});
  }
}

export async function getUsers(req:Request,res:Response){
  const keyword = req.params.keyword
  try {
    const users = await prisma.user.findMany({where:{username:{startsWith:keyword}}})
    const userList = users.map((user:any)=>{return {username:user.username,id:user.id,avatar:user.avatar}})
    return res.status(200).json({msg:"users fetched successfully",users:userList})
  } catch (error:any) {
    console.error(error);
    res.status(500).json({msg:"Internal server error",error:error});
  }
}
