import { useEffect, useState } from "react";
import axios from "axios";
import "./RecruiterProfile.css";

function RecruiterProfile() {

  const [profile, setProfile] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/recruiter/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log(res.data); // check object from backend
        setProfile(res.data.recruiter);

      } catch (error) {
        console.log("Profile fetch error:", error);
      }

    };

    fetchProfile();

  }, []);

  if (!profile) {
    return <h2 className="loading">Loading Profile...</h2>;
  }

  return (

    <div className="profile-container">

      <div className="profile-box">

        <h2 className="profile-title">Recruiter Profile</h2>

        <div className="profile-grid">

          <div className="profile-item">
            <span>ID</span>
            <p>{profile?._id}</p>
          </div>

          <div className="profile-item">
            <span>Name</span>
            <p>{profile?.username}</p>
          </div>

          <div className="profile-item">
            <span>Email</span>
            <p>{profile?.email}</p>
          </div>

          <div className="profile-item">
            <span>Role</span>
            <p>{profile?.role}</p>
          </div>

          <div className="profile-item">
            <span>Company</span>
            <p>{profile?.company?.name || "Not Added"}</p>
          </div>

          <div className="profile-item">
            <span>Created At</span>
            <p>
              {profile.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

        </div>

      </div>

    </div>

  );
}

export default RecruiterProfile;