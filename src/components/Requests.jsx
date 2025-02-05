import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  
  const dispatch = useDispatch();
  const requests = useSelector(store=>store.requests);

  const reviewRequests = async (status,_id) =>{
    try{
      const response = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`,{},{withCredentials: true})
      dispatch(removeRequest(_id))
    }catch(error){
      //Handle error , TODO: create error page
    }
  }

  const fetchConnectionRequests = async () =>{
    try{
      const response = await axios.get(`${BASE_URL}/user/request/recieved`,{withCredentials: true});
      dispatch(addRequests(response.data.data));
    }catch(error){
      //Handle Error 
    }
  }

  useEffect(()=>{
    fetchConnectionRequests();
  },[])

  if(!requests) return;
  if(requests.length === 0) return <div>No Request Found</div>
  return (
    <div>
      <div className='text-center'>Connection Requests</div>
      {requests?.map(request=>{
        const {firstName, lastName, photoUrl, description,age} = request.fromUserId;
        return (<div className='flex flex-row justify-center border m-4 p-4 rounded-lg mx-auto w-2/3'>
          <div className=''>
          <img className="h-40 w-40"src={photoUrl} alt='photo'></img>
          </div>
          <div className='m-2 p-2'>
            <h2>{firstName + " "+lastName}</h2>
            {age &&  (<p>{age}</p>)}
            <p>{description}</p>
          </div>
          <div className='m-2 p-2'>
          <button className="btn btn-primary m-2 p-2" onClick={()=> reviewRequests("rejected",request._id)}>Reject</button>
          <button className="btn btn-secondary m-2 p-2" onClick={()=> reviewRequests("accepted",request._id)}>Accept</button>
          </div>
        </div>)
      })}
    </div>
  )
}

export default Requests