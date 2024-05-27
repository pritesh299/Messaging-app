import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    usename: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
/*
UserSchema.pre('save',async ()=>{
    if (!this.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)
     this.password=await  bcrypt.hash(this.password,salt)
     
     next()
})

UserSchema.methods.MatchPasswords= async (enteredPassword:string)=>{
    return bcrypt.compare(enteredPassword,this.password)
} */
const User = mongoose.model("User", UserSchema);
export default User;
