import User from "../models/user.js";
import { Request, Response } from "express";

async function  RegisterUser(req: Request, res: Response) {
    console.log(req.body.username);
    try {
        let exist = await User.findOne({ username: req.body.username });

        if (exist) {
            res.status(200).json({ msg: "User already exists" });
        } else {
            const newUser = new User(req.body);
            await newUser.save();
             res.status(201).json({ msg: "User registered successfully" });
            return res.status(200).json(newUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

async function LoginUser(req: Request, res: Response) {

    try {
        console.log(req.body)
        const user = await User.findOne({email:req.body.email});

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Email' });
        }

        const passwordMatched = await user.matchPasswords(req.body.password);
        if (!passwordMatched) {
            return res.status(400).json({ msg: 'Invalid Password' });
        }

        res.status(200).json({ msg: 'Login successful' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export { LoginUser, RegisterUser };
