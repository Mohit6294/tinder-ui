import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { ToastContainer, toast } from 'react-toastify';

const EditProfile = ({user}) => {

  const [firstName, setFirstname] = useState(user?.firstName);
  const [lastName, setLastname] = useState(user?.lastName );
  const [gender, setGender] = useState(user?.gender);
  const [age, setAge] = useState(user?.age);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [description, setDescription] = useState(user?.description);
  const dispatch = useDispatch();

  const handleSaveProfile = async () =>{
    const user = {
      firstName,
      lastName,
      gender,
      age,
      photoUrl,
      description
    }
    try{
      const response = await axios.patch(`${BASE_URL}/profile/edit`,user,{withCredentials : true});
      dispatch(addUser(response.data.data));
      toast.success(response.data.message, {
        toastId: "profileUpdateMessage",
      })
    }catch(error){
      console.log("something went wrong");
      toast.error(error.response.data,{
        toastId: "profileUpdateError"
      })
    }
  }
  

  return (
    <div className="my-2 flex justify-center">
      <div className="card bg-blue-300  w-96 flex justify-center my-2 text-black">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Edit Profile</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">FirstName</span>
            </div>
            <input
              value={firstName}
              type="text"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">LastName</span>
            </div>
            <input
              value={lastName}
              type="text"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <input
              value={gender}
              type="text"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setGender(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Age</span>
            </div>
            <input
              value={age}
              type="text"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">PhotoUrl</span>
            </div>
            <input
              value={photoUrl}
              type="text"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <input
              value={description}
              type="text"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="card-actions flex justify-center">
            <button className="btn" onClick={handleSaveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}
export default EditProfile