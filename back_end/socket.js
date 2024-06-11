export let users = [];
let count = 0;
export const addUserToSocket = (userId, socketId) => {
    const user = users.find(user => user.userId === userId);
    const index = users.findIndex(user => user.userId === userId);
    if (!user) {
        users.push({ userId: userId, socketId: socketId });
    }
    if (user) {
        users[index] = { userId: userId, socketId: socketId };

    }
};
