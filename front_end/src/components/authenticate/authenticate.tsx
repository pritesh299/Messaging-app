import { useState } from "react";
import LoginPage from "./login";
import RegisterPage from "./register";

interface AuthenticateProps {
    authenticate :Boolean;
    setAuthenticate:React.Dispatch<React.SetStateAction<boolean>>;

}

const Authenticate:React.FC<AuthenticateProps>=({authenticate ,setAuthenticate})=>{
    const [login,setLogin]= useState(true)
    return(<>
 
    <div className="flex items-center w-full  justify-center bg-[#111b21] min-h-screen ">
     { login 
     ? <LoginPage  setLogin={setLogin}  setAuthenticate={setAuthenticate} /> 
     : <RegisterPage setLogin={setLogin}  setAuthenticate={setAuthenticate} />}
     </div>
    </>)
}

export default Authenticate