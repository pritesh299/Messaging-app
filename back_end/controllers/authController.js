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
function Login() {
    return __awaiter(this, void 0, void 0, function* () {
        let [username, email, password, avatar, contacts] = ["jngjb", "btb", "erthbgtbgf", "", ""];
        try {
            const newUser = new User({
                username,
                email,
                password,
                avatar,
                contacts
            });
            const savedUser = yield newUser.save();
        }
        catch (error) {
            console.error(`Error: ${error.message}`);
        }
        console.log("fdbvhbfshvbfsb");
    });
}
export default Login;
