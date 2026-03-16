import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Jobs.css";

const Jobs = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {

      const res = await axios.get("http://localhost:3000/api/jobs");

      setJobs(res.data.jobs);

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="jobs-container">

      <h1 className="jobs-title">Available Jobs</h1>

      <div className="jobs-grid">

        {jobs.length === 0 ? (
          <h3>No Jobs Available</h3>
        ) : (
          jobs.map((job) => (

            <div className="job-card" key={job._id}>

              <h2>{job.title}</h2>

              <p><b>Company:</b> {job.company?.name}</p>

              <p><b>Location:</b> {job.location}</p>

              <p><b>Salary:</b> {job.salary}</p>

              <p className="job-desc">{job.description}</p>

              <button className="apply-btn">Apply</button>

            </div>

          ))
        )}

      </div>

    </div>

  );
};

export default Jobs;