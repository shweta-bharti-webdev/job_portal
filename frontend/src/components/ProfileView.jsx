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
      const res = await axios.get("http://localhost:3000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        <h2 style={{textAlign: 'center', color: '#1a73e8', marginBottom: '20px'}}>My Profile</h2>
        
        <div className="profile-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="user-avatar"
            className="profile-img"
          />
          <div>
            <h3>{user.username}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="info-row">
            <b>User ID:</b> <span>{user._id}</span>
          </div>
          <div className="info-row">
            <b>Email:</b> <span>{user.email}</span>
          </div>
          <div className="info-row">
            <b>Account Role:</b> <span className="user-badge">{user.role}</span>
          </div>

          <div className="profile-bio-box">
             <h4>About Me</h4>
             <p>{user.profile?.bio || "No biography provided yet."}</p>
          </div>

          <div className="profile-skills-box">
             <h4>My Skills</h4>
             <p>{user.profile?.skills || "No skills listed yet."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;