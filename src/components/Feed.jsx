import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

export const Feed = () => {
  const feed= useSelector((store) => store.feed);
  const dispatch= useDispatch();
  
  const getFeed= async () => {
    if(feed) return;
    try {
      const res= await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res.data)
      dispatch(addFeed(res?.data));
    } catch(err){
      console.error("Error fetching feed:", err);
    }
  };
  

  useEffect(()=> {
    getFeed();
  }, []);
  
if(!feed) return;

if(feed.length<= 0) return <h1 className='flex justify-center my-10'>No New Users found</h1>

  return (
    feed && (
      <div className='flex justify-center my-10'>
        <UserCard user={feed[0]}/>
      </div>
    )
  )
}