import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({feed}) => {
  const {firstName, lastName, photoUrl, age, gender, description,_id} = feed;
  const dispatch = useDispatch();

  const handleFeedRequests = async (status,userId) =>{
    try{
      const response = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`,{},{withCredentials: true});
      dispatch(removeFeed(userId))
    }catch(error){
      //Handle Error : TODO: creating a Error page
    }
  }
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
    <figure>
      <img
        src={photoUrl ?? "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
        alt="Shoes"/>
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " "+lastName}</h2>
      <p>{age && gender && (age + ","+gender)}</p>
      <p>{description}</p>
      <div className="card-actions justify-center">
        <button className="btn btn-primary" onClick={()=> handleFeedRequests("ignored",_id)}>Ignore</button>
        <button className="btn btn-secondary" onClick={()=> handleFeedRequests("interested",_id)}>Interested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard