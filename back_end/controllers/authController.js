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
function RegisterUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password, avatar } = req.body;
        const secert = process.env.JWT_SECRET || "";
        if (secert === "") {
            console.log("ERROR: secert is undefiends,please check your jwt scecert ");
            return res.send(403);
        }
        console.log(username, email, password, avatar);
        try {
            const existingUser = yield prisma.user.findUnique({ where: { email: email } });
            if (existingUser) {
                return res.status(201).json({ msg: "User already exists" });
            }
            const user = yield prisma.user.create({
                data: {
                    name: username,
                    password: password,
                    email: email,
                    avatar: (avatar == "" ? undefined : avatar)
                },
            });
            return res.status(200).json({ msg: "New user Registered", user: user });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: 11000 });
        }
    });
}
function LoginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const secert = process.env.JWT_SECRET || "";
        const user = yield prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ msg: "user does not exist", code: 1 });
        }
        if (req.body.tokenAuthenticated) {
            res.status(200).json({ msg: 'Login successful', code: 4, user: user });
        }
        else {
            try {
                const passwordMatched = (user.password === password ? true : false);
                if (!passwordMatched) {
                    return res.status(400).json({ code: 2 });
                }
                // return res.status(200).json({ msg: 'Login successful',code:3,user:user});
                const payload = { email: email, password: password };
                jwt.sign(payload, secert, { expiresIn: '1h' }, (err, token) => {
                    if (err)
                        throw err;
                    res.status(200).json({ msg: 'Login successful', code: 3, user: user, token: token });
                });
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error", error: error });
            }
        }
    });
}
export { LoginUser, RegisterUser };
