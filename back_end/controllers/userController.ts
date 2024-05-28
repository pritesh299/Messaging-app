import {Request,Response} from "express"
import User from "../models/user.js"


export async function getUser(req: Request, res: Response) {
    const searchKeyword = req.params.Keyword;

    try {
        const userList = await User.find({ email: searchKeyword });
        res.json({ userList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}
