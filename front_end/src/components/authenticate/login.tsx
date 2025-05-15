import React, { useEffect, useState } from 'react';
import { LoginUser,  } from '../../api';
import { getGlobal, setGlobal } from "../../api";
import CircularProgress from '@mui/material/CircularProgress';

interface AuthenticateProps {
  setLogin:React.Dispatch<React.SetStateAction<boolean>>
  setAuthenticate:React.Dispatch<React.SetStateAction<boolean>>

}
const LoginPage:React.FC<AuthenticateProps> = ({setLogin,setAuthenticate}) => {
  const [userExits,setUserExits]=useState(true)
  const [corrrectPassword,setCorrectPassword]=useState<boolean>(true)
  const [loading,setLoading]=useState(false)
  const [formData,setFormData] = useState({
    email: '',
    password: '',
  });
 
   useEffect(()=>{
      async function sendToken(){
        if((localStorage.getItem("JWTtoken")!='')){
        setLoading(true)
        let response= await LoginUser({ 
          token:localStorage.getItem("JWTtoken")||""
        })


        if(response.code===0){
          setGlobal({
            id:response.user.id,
            username: response.user.username,
            email: response.user.email,
            avatar:response.user.avatar 
          }) 
          setAuthenticate(true)
          setLoading(false)
          localStorage.setItem("JWTtoken",response.token)
          }
         else{
          console.log(response)
          setUserExits(false)
          setCorrectPassword(false)
          setLoading(false)
        }
      }
    }
    sendToken()
   },[])
  
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setCorrectPassword(true)
    setUserExits(true)
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLoginSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true)
    let response = await LoginUser(formData)
    console.log(response)
        if(response.code===0){
          setGlobal({
            id:response.user.id,
            username: response.user.username,
            email: response.user.email,
            avatar:response.user.avatar 
          }) 
          setAuthenticate(true)
          setLoading(false)
          localStorage.setItem("JWTtoken",response.token)
        }
       else if(response.code==1){
        setUserExits(false)
        setLoading(false)
       }
       else if(response.code==2){
        setCorrectPassword(false)
        setLoading(false)
       }
  }; 

  return (
  <>
     {loading?<>
      <CircularProgress color="success" /></>
        :
        <div className="w-full max-w-md p-4 space-y-6 bg-[#202c33] rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-[#128C7E]">Login</h2>
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onClick={()=>{ setCorrectPassword(true);setUserExits(true)}}
                required
                placeholder='Email'
                className={`w-full px-3 py-2 mt-1  rounded-md shadow-sm focus:outline-none ${userExits?"border focus:ring-[#25D366] focus:border-[#25D366]":" border-4 border-red-700"}`}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                onClick={()=>{ setCorrectPassword(true);setUserExits(true)}}
                required
                placeholder='Password'

                className={`w-full px-3 py-2 mt-1  rounded-md shadow-sm focus:outline-none  ${corrrectPassword?"border focus:ring-[#25D366] focus:border-[#25D366]":" border-4 border-red-700"} `}
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
            New User?<a className='text-[#25D366]' onClick={()=>{ setLogin(false)}}> Register</a>
          </div>
        </div>}
  
  </>
  );
};

export default LoginPage;
