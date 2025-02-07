import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "./utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [roles, setRoles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response?.data));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data);
      console.log("Something went wrong" + error.message);
    }
  };

  const handleSignup = async () =>{
    try{
      const response = await axios.post(`${BASE_URL}/signup`,{
        firstName,
        lastName,
        roles,
        emailId,
        password
      },{withCredentials: true});
      dispatch(addUser(response.data.data));
      return navigate("/profile");
    }catch(error){
      // Handle Error - create a Error page
    }
  }

  return (
    <div className="my-2 flex justify-center">
      <div className="card bg-blue-300  w-96 flex justify-center my-2 text-black">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2>
          {!isLoginForm && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  value={firstName}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control w-fullh max-w-xs">
                <div className="label">
                  <span className="label-text">Select Roles</span>
                </div>
                <select className="select select-warning w-full max-w-xs" 
                value={roles} 
                onChange={(e)=>{
                  const selectedRoles = Array.from(e.target.selectedOptions, (option) => option.value);
                  setRoles(selectedRoles);
                }}
                multiple>
                  <option value="USER">
                    USER
                  </option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </label>
            </>
          )}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              value={emailId}
              type="text"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="card-actions flex justify-center">
            <span className="p-1 m-1 font-bold">{error}</span>
            <button className="btn" onClick={() => isLoginForm ? handleLogin() : handleSignup()}>
              {isLoginForm ? "Login" : "SignUp"}
            </button>
            <p
              className="m-auto cursor-pointer"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm
                ? "New User, please register Here"
                : "Existing User, please Login here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
