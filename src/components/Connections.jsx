import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store=>store.connections);

  const fetchConnections = async () =>{
    try{
      const response = await axios.get(`${BASE_URL}/user/connections`,{withCredentials: true});
      dispatch(addConnections(response.data.data));
    }catch(error){
      // TODO: create a error page
    }
  }

  useEffect(()=>{
    fetchConnections();
  },[])

  return (
    <div>
      <div className='text-center'>Connections</div>
      {connections?.map(connection=>{
        const {firstName, lastName, photoUrl, description,age} = connection;
        return (<div className='flex justify-center border m-4 p-4 rounded-lg mx-auto w-2/3'>
          <div className=''>
          <img className="h-20 w-20"src={photoUrl} alt='photo'></img>
          </div>
          <div className='m-2 p-2'>
            <h2>{firstName + " "+lastName}</h2>
            {age &&  (<p>{age}</p>)}
            <p>{description}</p>
          </div>
        </div>)
      })}
    </div>
  )
}

export default Connections;