// 

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileCard.css";

const ProfileView = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/user/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(res.data.user);

    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="profile-container">

      <div className="profile-card">

        <div className="profile-header">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="profile-img"
          />

          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

        </div>

        <div className="profile-details">

          <p><b>User ID:</b> {user._id}</p>

          <p><b>Name:</b> {user.name}</p>

          <p><b>Email:</b> {user.email}</p>

          <p><b>Role:</b> {user.role}</p>

          <p>
            <b>Company:</b>{" "}
            {user.company ? user.company.name : "Not Added"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default ProfileView;