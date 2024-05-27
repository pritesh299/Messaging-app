import React, { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-[#E5DDD5]">
  <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
    <h2 className="text-2xl font-bold text-center text-[#128C7E]">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-[#25D366] focus:border-[#25D366]"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-[#25D366] focus:border-[#25D366]"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
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
  </div>
</div>

  );
};

export default LoginPage;
