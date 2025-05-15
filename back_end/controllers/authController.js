var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from '../server.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "";
function RegisterUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password, avatar } = req.body;
        if (!JWT_SECRET) {
            console.error("FATAL: JWT_SECRET not defined in environment.");
            return res.status(500).json({ msg: "Server misconfiguration" });
        }
        if (username == "" || email == "" || password === "") {
            return res.status(400).json({ msg: "Missing fields" });
        }
        try {
            const existingUser = yield prisma.user.findUnique({ where: { email: email } });
            if (existingUser) {
                return res.status(409).json({ msg: "User already exists" });
            }
            const hashedPassword = yield bcrypt.hash(password, 10);
            const newUser = yield prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    email: email,
                    avatar: avatar || undefined
                },
            });
            const payload = { id: newUser.id, email: newUser.email };
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
        }
        catch (error) {
            console.error("Error during registration:", error);
            return res.status(500).json({ msg: "Internal server error" });
        }
    });
}
function LoginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, tokenAuthenticated } = req.body;
        if (!JWT_SECRET) {
            console.error("FATAL: JWT_SECRET not defined in environment.");
            return res.status(500).json({ msg: "Server misconfiguration" });
        }
        const user = yield prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ msg: "user does not exist", code: 1 });
        }
        if (tokenAuthenticated) {
            const token = req.body.token;
            res.status(200).json({
                msg: 'Login successful',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar
                },
                token,
                code: 0
            });
        }
        else {
            if (email == "" || password === "") {
                return res.status(400).json({ msg: "Missing fields" });
            }
            try {
                const passwordMatched = yield bcrypt.compare(password, user.password);
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
                    code: 0
                });
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error", error: error });
            }
        }
    });
}
export { LoginUser, RegisterUser };
