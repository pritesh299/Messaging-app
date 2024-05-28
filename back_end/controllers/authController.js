var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.js";
import jwt from "jsonwebtoken";
function RegisterUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password, avatar } = req.body;
        const secert = process.env.JWT_SECRET || "";
        if (secert === "") {
            console.log("ERROR: secert is undefiends,please check your jwt scecert ");
            return res.send(403);
        }
        try {
            let exist = yield User.findOne({ username });
            if (exist) {
                return res.status(200).json({ msg: "User already exists" });
            }
            console.log("Registering new user");
            const newUser = new User({ username, email, password, avatar });
            const payload = { user: newUser };
            jwt.sign(payload, secert, { expiresIn: '1h' }, (err, token) => {
                if (err)
                    throw err;
                res.status(201).json({ msg: "User registered successfully", user: newUser, token: token });
            });
            yield newUser.save();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error occurred" });
        }
    });
}
function LoginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const secert = process.env.JWT_SECRET || "";
        if (secert === "") {
            console.log("ERROR: secert is undefiends,please check your jwt scecert ");
            return res.send(403);
        }
        try {
            const user = yield User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Email' });
            }
            const passwordMatched = yield user.matchPasswords(req.body.password);
            if (!passwordMatched) {
                return res.status(400).json({ msg: 'Invalid Password' });
            }
            user.password = req.body.password;
            const payload = { user: user };
            jwt.sign(payload, secert, { expiresIn: '1h' }, (err, token) => {
                if (err)
                    throw err;
                res.status(201).json({ msg: "User registered successfully", user: user, token: token });
            });
            res.status(200).json({ msg: 'Login successful' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
        }
    });
}
export { LoginUser, RegisterUser };
