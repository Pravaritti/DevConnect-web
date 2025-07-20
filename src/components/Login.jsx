import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'; 
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId]= useState("elon@musk.com");
  const [password, setPassword]= useState("Elon@123");
  const dispatch= useDispatch();
  const navigate= useNavigate();

  const handleLogin= async () => {
    try{
      const res= await axios.post(
        BASE_URL+"/login", 
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");

    }catch(err){
      console.error(err);
    }
  };

  return (
    <div className='flex justify-center my-20'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input 
                type="text" 
                value={emailId}
                className="input input-bordered w-full max-w-xs" 
                placeholder="Type here"
                onChange={(e)=> setEmailId(e.target.value)} 
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input 
                type="text" 
                value={password}
                className="input" 
                placeholder="Type here" 
                onChange={(e)=> setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;