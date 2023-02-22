import React, { useContext } from "react";

import { userContext } from "../context/UserProvider";
import "../assets/css/profileInformation.css";

import type { UserContextType } from "@/types/types";

const ProfileInformation = () => {
  const { user } = useContext(userContext) as UserContextType;

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
