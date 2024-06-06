import mongoose, { Document, Model, Schema, mongo } from "mongoose";
import bcrypt from "bcryptjs";

interface User extends Document {
    username: string;
    email: string;
    password: string;
    avatar?: string;
    contactList:mongoose.Schema.Types.ObjectId[];
    matchPasswords(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema<User> = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    contactList:[{type:mongoose.Schema.ObjectId,ref:'User',
  
    }]
}, { timestamps: true });

UserSchema.pre<User>("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.methods.matchPasswords = async function (enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password);
};

const User: Model<User> = mongoose.model<User>("User", UserSchema);

export default User;
