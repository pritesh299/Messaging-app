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
import { error } from 'console';
export function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        try {
            const user = yield prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                res.status(404).json({ msg: "User not found" });
            }
            const userData = {
                username: user === null || user === void 0 ? void 0 : user.username,
                id: user === null || user === void 0 ? void 0 : user.id,
                avatar: user === null || user === void 0 ? void 0 : user.avatar
            };
            res.json(userData);
        }
        catch (errror) {
            console.log(error);
        }
    });
}
export function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.body.id);
        const username = (req.body.username ? req.body.username : null);
        const avatar = (req.body.avatar ? req.body.avatar : null);
        try {
            let exist = yield prisma.user.findUnique({ where: { id: userId } });
            if (!exist) {
                return res.status(404).json({ msg: "User doesn't exists" });
            }
            const updateUser = yield prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    username: (username ? username : exist.username),
                    avatar: (avatar ? avatar : exist.avatar),
                    updatedAt: new Date(),
                },
            });
            return res.status(200).json({ msg: "user updated successfully", user: { username: updateUser.username, avatar: updateUser.avatar, userId: updateUser.id }, code: 0 });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error", error: error });
        }
    });
}
export function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.userId);
        try {
            const resposne = yield prisma.user.delete({ where: { id: userId } });
            return res.status(202).json({ msg: "User is deleted successfully" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error", error: error });
        }
    });
}
export function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const keyword = req.params.keyword;
        try {
            const users = yield prisma.user.findMany({ where: { username: { startsWith: keyword } } });
            const userList = users.map((user) => { return { username: user.username, id: user.id, avatar: user.avatar }; });
            return res.status(200).json({ msg: "users fetched successfully", users: userList });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Internal server error", error: error });
        }
    });
}
