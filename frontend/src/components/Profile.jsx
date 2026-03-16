// 

import React from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const Profile = () => {

  const navigate = useNavigate();

  return (
    <div className="dashboard-container">

      {/* LEFT SIDE IMAGE */}
      <div className="dashboard-left">
        <img
          src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
          alt="tech"
          className="dashboard-image"
        />
      </div>

      {/* RIGHT SIDE FUNCTIONS */}
      <div className="dashboard-right">

        <h1 className="dashboard-title">User Dashboard</h1>

        <div className="function-grid">

          <div className="function-card" onClick={() => navigate("/profile/view")}>
            <h3>My Profile</h3>
            <p>View your personal profile details and skills</p>
          </div>

          <div className="function-card" onClick={() => navigate("/jobs")}>
            <h3>Find Jobs</h3>
            <p>Browse all available job opportunities</p>
          </div>

          <div className="function-card" onClick={() => navigate("/applications")}>
            <h3>My Applications</h3>
            <p>Track the status of your job applications</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;