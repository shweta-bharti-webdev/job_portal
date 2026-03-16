import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/user/jobs");
      setJobs(res.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to apply for jobs");
        return;
      }

      const res = await axios.post(
        `http://localhost:3000/api/user/applyJob/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.messsage || "Applied successfully!");
    } catch (error) {
      console.error("Apply error:", error);
      alert(error.response?.data?.message || "Failed to apply for job");
    }
  };

  if (loading) {
    return (
      <div className="jobs-container">
        <h1 className="jobs-title">Loading Jobs...</h1>
      </div>
    );
  }

  return (
    <div className="jobs-container">
      <h1 className="jobs-title">Browse Available Jobs</h1>

      <div className="jobs-grid">
        {jobs.length === 0 ? (
          <h3 className="no-jobs">No jobs found at the moment.</h3>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-header">
                <span className="job-type-badge">{job.jobType}</span>
                <span className="job-salary-badge">₹{job.salary}</span>
              </div>

              <h2>{job.title}</h2>
              
              <div className="job-info">
                <p><strong>🏢 Company:</strong> {job.company?.name || "Company Not Specified"}</p>
                <p><strong>👤 Recruiter:</strong> {job.createdBy?.username || "Anonymous"}</p>
                <p><strong>📍 Location:</strong> {job.location}</p>
                <p><strong>👥 Positions:</strong> {job.position} Vacancies</p>
              </div>

              <div className="job-description">
                <p>{job.description}</p>
              </div>

              {job.requirements && (
                <div className="job-requirements">
                  <p><strong>Requirements:</strong> {job.requirements}</p>
                </div>
              )}

              <button 
                className="apply-btn"
                onClick={() => handleApply(job._id)}
              >
                Apply Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;