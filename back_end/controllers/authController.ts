// import User from "../models/user.js";
import { Request, Response } from "express";
import { prisma } from '../server.js';
import jwt from "jsonwebtoken"

async function RegisterUser(req: Request, res: Response) {
    const { username, email, password, avatar } = req.body;
    const secert:string =  process.env.JWT_SECRET || ""
    if(secert===""){console.log("ERROR: secert is undefiends,please check your jwt scecert ");return  res.send(403)}


    try {
        let exist = await prisma.user.findUnique(
            { where:{
                name: username, 
                email:email 
            }});
        if (exist) {
            return res.status(200).json({ msg: "User already exists" });
        }

      const user = await prisma.user.create({
        data: {
          name: username,
          password: password,
          email: email,
          avatar:(avatar =="" ? null: avatar)
        },
      });

      return res.status(200).json({ msg: "New user Registered",user:user});

    } catch (error:any) {
        console.error(error);
        res.status(500).json({msg:11000})
    }
}

async function LoginUser(req: Request, res: Response) {
    const { username, email, password, avatar } = req.body;
    const secert:string =  process.env.JWT_SECRET || ""

    try {
        const user = await prisma.user.findUnique(
            { where:{
                name: username, 
                email:email 
            }});
        if (!user) {
            return res.status(400).json({code:1});
        }
        const passwordMatched = (user.password === password ? true: false)
        if (!passwordMatched) {
            return res.status(400).json({code:2});
        }
        return res.status(200).json({ msg: 'Login successful',code:4,user:user});
    // if(req.body.tokenAuthenticated){
    //     res.status(200).json({ msg: 'Login successful',code:4,user:user});
    // }else{
    //     const payload = { email:req.body.userData.email,password:req.body.userData.password};
    //     jwt.sign(payload, secert,{ expiresIn: '1h' }, (err, token) => {
    //      if (err) throw err;
    //      res.status(200).json({ msg: 'Login successful',code:3,user:user,token:token});
    //    });
    // }
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}

export { LoginUser,RegisterUser};
