import mongoose from "mongoose";
import bcrypt  from "bcryptjs"

const schema= new mongoose.Schema({
    usename:{type:String,require:true,unique:true} ,
    email:{type:String,require:true,unique:true},
    password:{require:true,type: String},
    avatar:{require:true},
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

UserSchema.pre('save',async ()=>{
    if (!this.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)
     this.password=await  bcrypt.hash(this.password,salt)  
     
     next()
})

UserSchema.methods.MatchPasswords= async (enteredPassword)=>{
    return bcrypt.compare(enteredPassword,this.password)
}

export default mongoose.model('User', UserSchema);