// import User from "../models/user.js";
import { Request, Response } from "express";
import { prisma } from '../server.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET:string =  process.env.JWT_SECRET || ""

async function RegisterUser(req: Request, res: Response) {
    const { username, email, password, avatar } = req.body;
    if (!JWT_SECRET) {
        console.error("FATAL: JWT_SECRET not defined in environment.");
        return res.status(500).json({ msg: "Server misconfiguration" });
    }
    if(username==""||email==""||password===""){
        return res.status(400).json({ msg: "Missing fields" });
    }
    try {
        const existingUser = await prisma.user.findUnique({where:{email:email}})

        if (existingUser) {
            return res.status(409).json({ msg: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
            username: username,
            password: hashedPassword,
            email: email,
            avatar:avatar || undefined
            },
        });
        const payload = {id: newUser.id, email:newUser.email};
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        return res.status(201).json({
            msg: "New user registered",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                avatar: newUser.avatar
            },
            token,
            });

        } catch (error) {
            console.error("Error during registration:", error);
            return res.status(500).json({ msg: "Internal server error" });
        }
}

async function LoginUser(req: Request, res: Response) {
    const { email, password,tokenAuthenticated} = req.body;
    if (!JWT_SECRET) {
        console.error("FATAL: JWT_SECRET not defined in environment.");
        return res.status(500).json({ msg: "Server misconfiguration" });
    }
    const user = await prisma.user.findUnique({where:{email:email}})
    if (!user) {
        return res.status(400).json({msg:"user does not exist",code:1});
    }
    if(tokenAuthenticated){
        const token = req.body.token
        res.status(200).json({ 
            msg: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            },
            token,
            code:0
        });
    }else{
        if(email==""||password===""){
            return res.status(400).json({ msg: "Missing fields" });
        }
        try {
            const passwordMatched = await bcrypt.compare(password, user.password);
            if (!passwordMatched) {
                return res.status(401).json({ msg: "Incorrect password", code: 2 });
            }
            const payload = { id: user.id, email: user.email };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({
                msg: "Login successful",
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  avatar: user.avatar
                },
                token,
                code:0
              });
        } catch (error) {
            res.status(500).json({ msg: "Internal server error" ,error:error});
        }
    }
}

export { LoginUser,RegisterUser};
