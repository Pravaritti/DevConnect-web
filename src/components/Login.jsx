import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'; 
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [firstName, setFirstName]= useState("");
  const [lastName, setLastName]= useState("");
  const [emailId, setEmailId]= useState("");
  const [password, setPassword]= useState("");
  const [isLoginForm, setIsLoginForm]= useState(true);
  const [error, setError]= useState("");
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
      setError(err?.response?.data || "Something went wrong!!");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try{
      const res= await axios.post(BASE_URL + "/signup", 
        {firstName, lastName, emailId, password},
        {withCredentials: true}
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch(err){
      setError(err?.response?.data || "Something went wrong!!");
      console.error(err);
    }
  }

  return (
    <div className='flex justify-center my-20'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Signup" }
          </h2>
          <div>
            {!isLoginForm && ( 
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input 
                    type="text" 
                    value={firstName}
                    className="input input-bordered w-full max-w-xs" 
                    placeholder="Type here"
                    onChange={(e)=> setFirstName(e.target.value)} 
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input 
                    type="text" 
                    value={lastName}
                    className="input input-bordered w-full max-w-xs" 
                    placeholder="Type here"
                    onChange={(e)=> setLastName(e.target.value)} 
                  />
                </fieldset>
              </>
            )}
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
            <p className='text-red-500'>{error}</p>
            <button className="btn btn-primary" 
            onClick={isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "Sign up"}
            </button>
          </div>
          <p className='m-auto cursor-pointer' 
            onClick={() => setIsLoginForm((value)=>!value)}> 
            {isLoginForm ? "New User? Signup Here" : 
            "Existin User? Login Here"} 
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;