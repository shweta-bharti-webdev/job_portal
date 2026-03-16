import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Applicants.css";

function Applicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = jobId === "all" 
        ? "http://localhost:3000/api/recruiter/applicants/all"
        : `http://localhost:3000/api/recruiter/applicants/${jobId}`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplicants(res.data.applicants);
    } catch (error) {
      console.error("Applicants fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");
      // Fixed the status update URL to match the backend route
      await axios.patch(
        `http://localhost:3000/api/recruiter/application/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Application ${status} successfully!`);
      fetchApplicants(); // Refresh list
    } catch (error) {
      console.error("Status update error:", error);
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="applicants-container">
        <h2 className="loading">Loading Applicants...</h2>
      </div>
    );
  }

  return (
    <div className="applicants-container">
      <div className="applicants-header">
        <h2>{jobId === "all" ? "All Applicants Overseer" : "Job Applicants"}</h2>
        <p>Viewing {applicants.length} potential candidates</p>
      </div>

      <div className="applicants-grid">
        {applicants.length === 0 ? (
          <h3 className="no-applicants">No applicants found for your criteria.</h3>
        ) : (
          applicants.map((app) => (
            <div className="applicant-card" key={app._id}>
              <div className="card-top">
                <span className={`status-badge status-${app.status}`}>
                  {app.status}
                </span>
                <span className="apply-date">{new Date(app.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="applicant-info">
                <h3>{app.applicant?.username || "Unknown User"}</h3>
                <p className="applicant-email">{app.applicant?.email}</p>
              </div>

              <div className="job-applied-for">
                 <p className="job-label">Applied For</p>
                 <h4 className="job-name">{app.job?.title || "Deleted Job"}</h4>
                 <p className="company-name">{app.job?.company?.name || "Company Info N/A"}</p>
              </div>

              <div className="applicant-summary">
                <p><strong>Bio:</strong> {app.applicant?.profile?.bio || "No professional bio provided."}</p>
                <p><strong>Skills:</strong> {app.applicant?.profile?.skills || "No skills listed."}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Applicants;