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
function RegisterUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body.username);
        try {
            let exist = yield User.findOne({ username: req.body.username });
            if (exist) {
                res.status(200).json({ msg: "User already exists" });
            }
            else {
                const newUser = new User(req.body);
                yield newUser.save();
                res.status(201).json({ msg: "User registered successfully" });
                return res.status(200).json(newUser);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
        }
    });
}
function LoginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const user = yield User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Email' });
            }
            const passwordMatched = yield user.matchPasswords(req.body.password);
            if (!passwordMatched) {
                return res.status(400).json({ msg: 'Invalid Password' });
            }
            res.status(200).json({ msg: 'Login successful' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error" });
        }
    });
}
export { LoginUser, RegisterUser };
