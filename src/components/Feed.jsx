import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {

  const dispatch = useDispatch();
  const feedData = useSelector(store=>store.feed);

  const fetchFeed = async () =>{
    if(feedData) return;
    try{
      const response = await axios.get(`${BASE_URL}/feed`,{withCredentials: true});
      dispatch(addFeed(response?.data));
    }catch(error){
      //handle error page by creating a error page
    }
  }

  useEffect(()=>{
    fetchFeed();
  },[])
  return (
    feedData &&  <div className='m-2 p-2 flex justify-center'>
       <UserCard feed = {feedData?.user?.[0]}/>
    </div>
   
  )
}

export default Feed