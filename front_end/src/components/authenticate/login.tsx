import React, { useState } from 'react';
import { LoginUser, getUser } from '../../api';
import { setGlobal } from '../App';


interface AuthenticateProps {
  setLogin:React.Dispatch<React.SetStateAction<boolean>>
  setAuthenticate:React.Dispatch<React.SetStateAction<boolean>>
}

const LoginPage:React.FC<AuthenticateProps> = ({setLogin,setAuthenticate}) => {
  const [userExits,setUserExits]=useState(true)
  const [corrrectPassword,setCorrectPassword]=useState<boolean>()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  console.log(formData)

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    let response = await LoginUser(formData)
       if(response.code==1){
        setUserExits(false)
       }
       if(response.code==2){
        setCorrectPassword(false)
       }
       if(response.code===3){
        setGlobal({
          id:response.user._id,
          username: response.user.username,
          email: response.user.email,
          avatar:response.user.avatar 
        }) 
        setAuthenticate(true)
       }
  }; 

  return (

  <div className="w-full max-w-md p-4 space-y-6 bg-[#202c33] rounded shadow-md">
    <h2 className="text-2xl font-bold text-center text-[#128C7E]">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder='Email'
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-[#25D366] focus:border-[#25D366]"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder='Password'

          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-[#25D366] focus:border-[#25D366]"
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
  </div>


  );
};

export default LoginPage;
