'use client'

import React, { useState } from 'react';
import TextField from '../signin/page';


const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <TextField 
            label="Password" 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            type="submit" 
            className="w-full py-3 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
