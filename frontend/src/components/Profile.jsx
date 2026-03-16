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
            <h3>Profile</h3>
            <p>Fetch the logged in user's profile</p>
          </div>

          <div className="function-card" onClick={() => navigate("/profile/update")}>
            <h3>Profile Update</h3>
            <p>Update user's profile info</p>
          </div>

          <div className="function-card" onClick={() => navigate("/jobs")}>
            <h3>Jobs</h3>
            <p>Fetch all available jobs</p>
          </div>

          <div className="function-card" onClick={() => navigate("/jobs/id")}>
            <h3>Jobs By Id</h3>
            <p>Get details of a specific job</p>
          </div>

          <div className="function-card" onClick={() => navigate("/jobs/apply")}>
            <h3>Apply Job</h3>
            <p>User applies for a job</p>
          </div>

          <div className="function-card" onClick={() => navigate("/applications")}>
            <h3>My Applications</h3>
            <p>Get all jobs the user applied for</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;