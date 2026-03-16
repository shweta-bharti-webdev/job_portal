import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostedJobs.css";

function MyJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/recruiter/my_jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setJobs(res.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="postedJobsContainer"><h2 className="pageTitle">Loading...</h2></div>;
  }

  return (
    <div className="postedJobsContainer">
      <h2 className="pageTitle">My Posted Jobs</h2>

      {jobs.length > 0 ? (
        <div className="jobsGrid">
          {jobs.map((job) => (
            <div key={job._id} className="jobCard">
              <div className="job-badges">
                <span className="badge badge-type">{job.jobType}</span>
                <span className="badge badge-salary">₹{job.salary}</span>
                <span className="badge badge-location">{job.location}</span>
              </div>

              <h3>{job.title}</h3>
              
              <p><strong>Company:</strong> {job.company?.name || "N/A"}</p>
              <p><strong>Recruiter:</strong> {job.createdBy?.username || "Unknown"}</p>
              <p><strong>Positions:</strong> {job.position} Openings</p>
              
              <div className="job-details">
                <p><strong>Description:</strong></p>
                <p>{job.description}</p>
              </div>

              <div className="job-actions" style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
                <button 
                  onClick={() => navigate(`/recruiter/applicants/${job._id}`)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#1a73e8',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  View Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="noJobs">You haven't posted any jobs yet.</p>
      )}
    </div>
  );
}


export default MyJobs;