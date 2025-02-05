import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from './utils/constants'

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(store=>store.user);


  const fetchUser =async () =>{
    try{
      const res = await axios.get(`${BASE_URL}/profile/view`,{withCredentials: true});
      dispatch(res.data);
    }catch(error){
      navigate("/login");
      console.log(error);
      
    }
  }


  useEffect(()=>{
    if(userData === null){
      fetchUser();
    }
  },[])
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body