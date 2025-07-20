import React, { useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';

export const Feed = () => {
  const feed= useSelector((store) => store.feed);
  const dispatch= useDispatch();

  const getFeed= async () => {
    if(feed) return;
    try {
      const res= await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch(err){}
  };

  useEffect(()=> {
    getFeed();
  }, []);

  return (
    <div>Feed</div>
  )
}
