import React from "react";

import { useUser } from "../hooks";

import "../assets/css/profileInformation.css";

const ProfileInformation = () => {
  const { user } = useUser();

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
        <p>{user?.signedUpAt}</p>
      </div>
    </div>
  );
};

export default ProfileInformation;
