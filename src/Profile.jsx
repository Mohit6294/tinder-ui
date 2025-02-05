import React from "react";
import EditProfile from "./components/EditProfile";
import UserCard from "./components/UserCard";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="flex justify-center">
      <div>
        <EditProfile user={user} />
      </div>
      <div className="m-4">
        <UserCard feed={user} />
      </div>
    </div>
  );
};

export default Profile;
