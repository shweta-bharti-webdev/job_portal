import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyApplications.css";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const fetchMyApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/user/my_applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplications(res.data.applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="applications-container">
        <h2 className="loading">Loading your applications...</h2>
      </div>
    );
  }

  return (
    <div className="applications-container">
      <div className="applications-header">
        <h1>My Job Applications</h1>
        <p>You have applied for {applications.length} jobs so far.</p>
      </div>

      <div className="applications-grid">
        {applications.length === 0 ? (
          <div className="no-apps">
            <h3>No applications yet!</h3>
            <p>Go to the "Find Jobs" section to start applying.</p>
          </div>
        ) : (
          applications.map((app) => (
            <div className="application-card" key={app._id}>
              <div className="app-status-row">
                <span className={`status-tag tag-${app.status}`}>
                  {app.status}
                </span>
                <span className="app-date">Applied on: {new Date(app.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="app-job-info">
                <h2>{app.job?.title || "Job Title N/A"}</h2>
                <p className="app-company"><strong>🏢 Company:</strong> {app.job?.company?.name || "Private Company"}</p>
                <p className="app-location"><strong>📍 Location:</strong> {app.job?.location}</p>
              </div>

              <div className="app-job-details">
                <p><strong>Salary:</strong> ₹{app.job?.salary}</p>
                <p><strong>Description:</strong> {app.job?.description?.substring(0, 80)}...</p>
              </div>

              <div className="app-footer">
                <p className="app-id">Application Ref: {app._id}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyApplications;
