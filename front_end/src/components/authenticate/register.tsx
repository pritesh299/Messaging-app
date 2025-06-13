import React, { useState } from 'react';
import { registerUser } from '../../api';
import { setGlobal } from "../../api";
import CircularProgress from '@mui/material/CircularProgress';
import ChangeProfileImage from './profileImage';

interface AuthenticateProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterPage: React.FC<AuthenticateProps> = ({ setLogin, setAuthenticate }) => {
  const [viewProfileImages, setViewProfileImages] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>("https://api.dicebear.com/9.x/adventurer/svg?seed=Brian&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  // Handle input changes for form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailError(false);
    setUserNameError(false);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Handle form submission
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      avatar: imgSrc,
    }));
    setLoading(true);
    let response = await registerUser(formData);
    // response = response.data;
    if (response.code === 1) {
      setEmailError(true);
    }
    if (response.code === 2) {
      setUserNameError(true);
    }
    if (response.code === 0) {
      setGlobal({
        id: response.user.id,
        username: response.user.name,
        email: response.user.email,
        avatar: response.user.avatar,
      });
      setEmailError(false);
      setUserNameError(false);
      localStorage.setItem("JWTtoken", response.token);
      setAuthenticate(true);
    }
    setLoading(false);
  };

  return (
    <>
      {loading
        ? <div className="flex justify-center items-center h-screen"><CircularProgress color="success" /></div>
        : <>
          {viewProfileImages
            ? <ChangeProfileImage setViewProfileImages={setViewProfileImages} imgSrc={imgSrc} setImgSrc={setImgSrc} />
            : <>
                <div className="w-full max-w-md p-6 space-y-6 bg-[#202c33] rounded-lg shadow-xl">
                  <h2 className="text-2xl font-bold text-center text-[#128C7E] mb-6">Register User</h2>
                  <form onSubmit={handleRegisterSubmit} className="space-y-6 text-white">
                    {/* Username Field */}
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium">Username</label>
                      {userNameError && <div className='text-red-400 text-xs'>Username already in use, please choose another one.</div>}
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Username"
                        className={`w-full text-black px-4 py-3 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25D366] ${userNameError ? 'border-red-400' : 'border-gray-300'}`}
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium">Email</label>
                      {emailError && <div className='text-red-400 text-xs'>Email already in use, please choose another one.</div>}
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Email"
                        className={`w-full text-black px-4 py-3 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25D366] ${emailError ? 'border-red-400' : 'border-gray-300'}`}
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Password"
                        className="w-full text-black px-4 py-3 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#25D366] border-gray-300"
                      />
                    </div>

                    {/* Profile Image Section */}
                    <div className="flex justify-between items-center gap-4 mt-4">
                      <div className="h-[10vh] w-[10vh] rounded-full bg-white flex justify-center items-center p-1">
                        <img
                          src={imgSrc}
                          alt="profile image"
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {setViewProfileImages(true)}}
                        className="flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 rounded-full p-3 w-12 h-12 transition duration-200"
                        aria-label="Change profile image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                          <path d="M12 20h9m-9-9h9M5 12H2m9-9H2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </button>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        className="w-full px-4 py-3 font-medium text-white bg-[#25D366] rounded-md hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#128C7E]"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>

                  {/* Already a User Section */}
                  <div className="text-center text-white mt-6">
                    Already a User? <button className="text-[#25D366]" onClick={() => setLogin(true)}>Login</button>
                  </div>
                </div>
              </>
          }
        </>
      }
    </>
  );
};

export default RegisterPage;
