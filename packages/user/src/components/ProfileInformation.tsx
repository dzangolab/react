import React from "react";

import "../assets/css/profileInformation.css";

import { useSelector } from "react-redux";

const ProfileInformation = () => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="profile">
      <div className="profile-group">
        <label>Id</label>
        <p>{user?.id}</p>
      </div>
      <div className="profile-group">
        <label>Email</label>
        <p>{user?.email}</p>
      </div>
      <div className="profile-group">
        <label>Time Joined</label>
        <p>{user?.timeJoined}</p>
      </div>
    </div>
  );
};

export default ProfileInformation;
