import User from "../models/user.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"


async function RegisterUser(req: Request, res: Response) {
    let { username, email, password, avatar } = req.body;
    const secert:string =  process.env.JWT_SECRET || ""
    if(secert===""){console.log("ERROR: secert is undefiends,please check your jwt scecert ");return  res.send(403)}


    try {
        let exist = await User.findOne({ email });
        if (exist) {
            return res.status(200).json({ msg: "User already exists" });
        }
      if(avatar===""){
        avatar=
      }
      console.log(password)
        const newUser = new User({ username, email, password,avatar,contactList:[] });
        console.log(password)
        const payload = { email:email,password:password};
        await newUser.save();
       jwt.sign(payload , secert,{ expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
         res.status(201).json({ msg: "User registered successfully", user: newUser,token:token });
      }); 
      
    } catch (error:any) {
        console.error(error);
        res.status(500).json({msg:11000})
    
    }
}

async function LoginUser(req: Request, res: Response) {
    const secert:string =  process.env.JWT_SECRET || ""
    if(secert===""){console.log("ERROR: secert is undefiends,please check your jwt scecert ");return  res.send(403)}
    try {
        const user = await User.findOne({email:req.body.userData.email});
        if (!user) {
            return res.status(400).json({code:1});
        }
        const passwordMatched = await user.matchPasswords(req.body.userData.password);
        if (!passwordMatched) {
            return res.status(400).json({code:2});
        }
    if(req.body.tokenAuthenticated){
        res.status(200).json({ msg: 'Login successful',code:4,user:user});
    }else{
        const payload = { email:req.body.userData.email,password:req.body.userData.password};
        jwt.sign(payload, secert,{ expiresIn: '1h' }, (err, token) => {
         if (err) throw err;
         res.status(200).json({ msg: 'Login successful',code:3,user:user,token:token});
       });
    }
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
}

export { LoginUser, RegisterUser };
