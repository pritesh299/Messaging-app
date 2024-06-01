import User from "../models/user.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"


async function RegisterUser(req: Request, res: Response) {
    const { username, email, password, avatar } = req.body;
    const secert:string =  process.env.JWT_SECRET || ""
    if(secert===""){console.log("ERROR: secert is undefiends,please check your jwt scecert ");return  res.send(403)}


    try {

        let exist = await User.findOne({ username });

        if (exist) {
            return res.status(200).json({ msg: "User already exists" });
        }

        console.log("Registering new user");
        const newUser = new User({ username, email, password, avatar,contactList:[] });
        const payload = { user: newUser };
    
       jwt.sign(payload , secert,{ expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
         res.status(201).json({ msg: "User registered successfully", user: newUser,token:token });
      }); 

      await newUser.save();

     
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error occurred" });
    }
}

async function LoginUser(req: Request, res: Response) {
    const secert:string =  process.env.JWT_SECRET || ""
    if(secert===""){console.log("ERROR: secert is undefiends,please check your jwt scecert ");return  res.send(403)}

    try {
        const user = await User.findOne({email:req.body.email});
        
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Email' });
        }

        const passwordMatched = await user.matchPasswords(req.body.password);
        if (!passwordMatched) {
            return res.status(400).json({ msg: 'Invalid Password' });
        }
        user.password=req.body.password
        const payload = { user: user };
        jwt.sign(payload , secert,{ expiresIn: '1h' }, (err, token) => {
         if (err) throw err;
          res.status(201).json({ msg: "User registered successfully", user: user, token:token });
       }); 
      

        res.status(200).json({ msg: 'Login successful' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export { LoginUser, RegisterUser };
