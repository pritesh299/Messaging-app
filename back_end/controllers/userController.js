var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/user.js';
import { error } from 'console';
export function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchKeyword = req.body.Keyword;
        const userId = req.body.userId;
        try {
            const user = yield User.findOne({ _id: userId });
            if (user) {
                const contactList = user.contactList;
                const userList = yield User.find({
                    $and: [
                        { email: { $regex: new RegExp(searchKeyword, 'i') } },
                        { _id: { $nin: [...contactList, userId] } }
                    ]
                });
                res.json({ userList });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Internal server error' });
        }
    });
}
export function getContacts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = req.params.id;
        try {
            const contactList = (_a = (yield User.findOne({ _id: userId }))) === null || _a === void 0 ? void 0 : _a.contactList;
            res.json(contactList);
        }
        catch (errror) {
            console.log(error);
        }
    });
}
export function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.id;
        try {
            const user = yield User.findOne({ _id: userId });
            res.json(user);
        }
        catch (errror) {
            console.log(error);
        }
    });
}
export function addContact(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.body.userId;
        let contact = req.body.ContactData;
        try {
            const user1 = yield User.findOne({ _id: userId });
            const user2 = yield User.findOne({ _id: contact._id });
            console.log(contact);
            if (user1) {
                let response = yield user1.updateOne({ contactList: [...user1.contactList, contact] });
                return res.json(response);
            }
            if (user2) {
                let response = yield user2.updateOne({ contactList: [...user2.contactList, contact] });
                return res.json(response);
            }
            res.json({ msg: "user not found" });
        }
        catch (errror) {
            console.log(error);
        }
    });
}
