import React, { useState } from 'react';
import { registerUser } from '../../api';
import { setGlobal } from "../../api";
import CircularProgress from '@mui/material/CircularProgress';


interface AuthenticateProps {
    setLogin:React.Dispatch<React.SetStateAction<boolean>>
    setAuthenticate:React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterPage:React.FC<AuthenticateProps> = ({setLogin,setAuthenticate}) => {
  const [emailError,setEmailError]= useState(false)
  const [userNameError,setUserNameError]= useState(false)
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar:"",
  });
     
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailError(false)
    setUserNameError(false)

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   const handleRegisterSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    let response = await registerUser(formData)
    if (response.code===1){
      setEmailError(true)
    }
    if (response.code===2){
      setUserNameError(true)
    }
    if(response.code===0) {
      setGlobal({
        id:response.user.id,
        username: response.user.name,
        email: response.user.email,
        avatar:response.user.avatar 
      }) 
      setEmailError(false)
      setUserNameError(false)
      localStorage.setItem("JWTtoken",response.token)
      setAuthenticate(true)
    }
    setLoading(false)
  };

  return (<>
      {loading
      ? <CircularProgress color="success" />
      : <div className="w-full max-w-md p-4 space-y-6 bg-[#202c33]  rounded shadow-md">
    <h2 className="text-2xl font-bold text-center text-[#128C7E]">Register User </h2>
    <form onSubmit={handleRegisterSubmit} className="space-y-6  text-white">
      <div>
        <label htmlFor="username" className="block text-sm font-medium ">Username {userNameError?<div className='text-red-400'>Username already in use,use another Username</div>:""}</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          required
          placeholder='Username'
          className={`w-full text-black px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none ${userNameError?" border-red-400 ":""} focus:ring-[#25D366] focus:border-[#25D366]`}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium ">Email {emailError?<div className='text-red-400'>email already in use,use another email</div>:""}</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder='Email'

          className={`w-full text-black px-3 py-2 mt-1 border rounded-md shadow-sm   focus:outline-none ${emailError?" border-red-400 ":""} focus:ring-[#25D366] focus:border-[#25D366]`}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium e">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          placeholder='Password'
          className="w-full px-3  text-black py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-[#25D366] focus:border-[#25D366]"
        />
      </div>
      <div className="w-full px-3 py-2 mt-1  rounded-md  focus:outline-none ">
        <label htmlFor="password" className="block text-sm font-medium text-white">Profile Image</label>
        <input  type="file" alt="Submit" width="48" height="48"
          id="image"
          name="avatar"
          accept="image/*"
          value={formData.avatar}
          onChange={handleInputChange}
        />
      </div>

         
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-medium text-white bg-[#25D366] rounded-md hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#128C7E]"
        >
          Sign In
        </button>
      </div>
    </form>
    <div className='text-white'>
      Already a User? <button className='text-[#25D366]' onClick={()=>{setLogin(true)}}>Login</button>
    </div>
  </div>}
   

  </>
  );
};

export default RegisterPage;
