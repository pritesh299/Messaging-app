
import User from "../models/user.js"

async function Login(){
     let [username, email, password, avatar, contacts]=["jngjb","btb","erthbgtbgf","",""]

    try {

    const newUser = new User({
        username,
        email,
        password,
        avatar,
        contacts
      });
      
    const savedUser = await newUser.save();

    } catch (error:any) {

      console.error(`Error: ${error.message}`);

    } 

   console.log("fdbvhbfshvbfsb")

}

export default Login

