import React, { useEffect, useState } from 'react';
import { LoginUser } from '../../api';
import { setGlobal } from '../../api';
import CircularProgress from '@mui/material/CircularProgress';

interface AuthenticateProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthenticate: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: React.FC<AuthenticateProps> = ({ setLogin, setAuthenticate }) => {
  const [userExists, setUserExists] = useState(true);
  const [correctPassword, setCorrectPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('JWTtoken');
    if (!token) return;

    const sendToken = async () => {
      setLoading(true);
      const response = await LoginUser({ token });

      if (response.code === 0) {
        handleSuccessfulLogin(response);
      } else {
        setUserExists(false);
        setCorrectPassword(false);
      }

      setLoading(false);
    };

    sendToken();
  }, []);

  const handleSuccessfulLogin = (response: any) => {
    setGlobal({
      id: response.user.id,
      username: response.user.username,
      email: response.user.email,
      avatar: response.user.avatar,
    });

    localStorage.setItem('JWTtoken', response.token);
    setAuthenticate(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserExists(true);
    setCorrectPassword(true);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await LoginUser(formData);

    if (response.code === 0) {
      handleSuccessfulLogin(response);
    } else if (response.code === 1) {
      setUserExists(false);
    } else if (response.code === 2) {
      setCorrectPassword(false);
    }

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="w-full max-w-md p-4 space-y-6 bg-[#202c33] rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-[#128C7E]">Login</h2>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onClick={() => {
                  setCorrectPassword(true);
                  setUserExists(true);
                }}
                required
                placeholder="Email"
                className={`w-full px-3 py-2 mt-1 rounded-md shadow-sm focus:outline-none ${
                  userExists
                    ? 'border focus:ring-[#25D366] focus:border-[#25D366]'
                    : 'border-4 border-red-700'
                }`}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                onClick={() => {
                  setCorrectPassword(true);
                  setUserExists(true);
                }}
                required
                placeholder="Password"
                className={`w-full px-3 py-2 mt-1 rounded-md shadow-sm focus:outline-none ${
                  correctPassword
                    ? 'border focus:ring-[#25D366] focus:border-[#25D366]'
                    : 'border-4 border-red-700'
                }`}
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

          <div className="text-white text-center">
            New User?{' '}
            <button
              className="text-[#25D366] underline hover:text-[#128C7E]"
              onClick={() => setLogin(false)}
            >
              Register
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
